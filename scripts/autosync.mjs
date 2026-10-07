// Sube automáticamente a GitHub cada cambio del proyecto.
// Espera a que pase un rato sin cambios (para no subir a mitad de una edición),
// hace commit de todo y lo sube. Vercel despliega cada subida a GitHub.
//
// Uso: npm run autosync   (déjalo abierto mientras trabajas; Ctrl+C para pararlo)

import { execFileSync } from "node:child_process"
import { watch } from "node:fs"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const WAIT_MS = 60_000
const IGNORED = /(^|[\\/])(\.git|node_modules|\.next|\.vercel)([\\/]|$)|\.tsbuildinfo$/

let timer = null
let syncing = false
let pendingAgain = false

function git(...args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
}

function log(message) {
  console.log(`[autosync ${new Date().toLocaleTimeString("es-ES")}] ${message}`)
}

function sync() {
  if (syncing) {
    pendingAgain = true
    return
  }
  syncing = true
  try {
    git("add", "-A")
    const changed = git("diff", "--cached", "--name-only").split("\n").filter(Boolean)
    if (changed.length === 0) return

    const stamp = new Date().toLocaleString("es-ES")
    const files = changed.slice(0, 10).map((file) => `- ${file}`).join("\n")
    const more = changed.length > 10 ? `\n- … y ${changed.length - 10} más` : ""
    git("commit", "-q", "-m", `Cambios automáticos (${stamp})`, "-m", files + more)
    log(`commit con ${changed.length} archivo(s)`)

    try {
      git("push", "-q")
    } catch {
      // Si GitHub tiene cambios que aquí no están, los trae primero y vuelve a intentarlo.
      git("pull", "--rebase", "-q")
      git("push", "-q")
    }
    log("subido a GitHub ✔")
  } catch (error) {
    log(`no se pudo sincronizar: ${error.stderr || error.message}`)
  } finally {
    syncing = false
    if (pendingAgain) {
      pendingAgain = false
      schedule()
    }
  }
}

function schedule() {
  clearTimeout(timer)
  timer = setTimeout(sync, WAIT_MS)
}

watch(ROOT, { recursive: true }, (_event, file) => {
  if (!file || IGNORED.test(file)) return
  schedule()
})

log(`vigilando cambios en ${ROOT} (se suben ${WAIT_MS / 1000} s después del último cambio)`)
sync()
