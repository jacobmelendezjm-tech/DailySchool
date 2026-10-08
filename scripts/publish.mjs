// Publica los cambios: commit + push a GitHub y despliegue en Vercel (producción).
// Lo lanza automáticamente un hook "Stop" de Claude Code al terminar cada respuesta
// (ver ../../.claude/settings.json). También se puede ejecutar a mano: node scripts/publish.mjs
//
// Si no hay cambios, no hace nada. El registro queda en .vercel/publish.log (no se sube a git).

import { execFileSync, execSync } from "node:child_process"
import { appendFileSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { join } from "node:path"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const STATE_DIR = join(ROOT, ".vercel")
const LOG = join(STATE_DIR, "publish.log")
const LOCK = join(STATE_DIR, "publish.lock")
const PENDING = join(STATE_DIR, "publish.pending")
const LOCK_MAX_AGE_MS = 15 * 60_000

mkdirSync(STATE_DIR, { recursive: true })

function log(message) {
  appendFileSync(LOG, `[${new Date().toLocaleString("es-ES")}] ${message}\n`)
}

function git(...args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
}

// Solo una publicación a la vez: si ya hay una en marcha, se deja un aviso y la que
// está en marcha vuelve a ejecutarse al terminar, para no perder cambios.
if (existsSync(LOCK) && Date.now() - statSync(LOCK).mtimeMs < LOCK_MAX_AGE_MS) {
  writeFileSync(PENDING, "")
  process.exit(0)
}
writeFileSync(LOCK, String(process.pid))

function publish() {
  git("add", "-A")
  const changed = git("diff", "--cached", "--name-only").split("\n").filter(Boolean)
  const unpushed = Number(git("rev-list", "--count", "@{u}..HEAD") || 0)
  if (changed.length === 0 && unpushed === 0) return

  if (changed.length > 0) {
    const files = changed.slice(0, 10).map((file) => `- ${file}`).join("\n")
    const more = changed.length > 10 ? `\n- … y ${changed.length - 10} más` : ""
    git(
      "commit",
      "-q",
      "-m",
      `Cambios automáticos (${new Date().toLocaleString("es-ES")})`,
      "-m",
      files + more,
      "-m",
      "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
    )
    log(`commit con ${changed.length} archivo(s)`)
  }

  try {
    git("push", "-q")
  } catch {
    // Si GitHub tiene cambios que aquí no están, los trae primero y vuelve a intentarlo.
    git("pull", "--rebase", "-q")
    git("push", "-q")
  }
  log("subido a GitHub ✔")

  const output = execSync("npx -y vercel@latest deploy --prod --yes", {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  })
  const url = output.match(/https:\/\/\S+\.vercel\.app/g)?.at(-1) ?? ""
  log(`publicado en Vercel ✔ ${url}`)
}

try {
  do {
    rmSync(PENDING, { force: true })
    publish()
  } while (existsSync(PENDING))
} catch (error) {
  log(`ERROR: ${(error.stderr || error.message || String(error)).toString().trim()}`)
  process.exitCode = 1
} finally {
  rmSync(LOCK, { force: true })
}
