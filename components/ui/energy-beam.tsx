"use client"

import { useEffect, useId, useRef } from "react"

import { cn } from "@/lib/utils"

interface EnergyBeamProps {
  projectId?: string
  className?: string
}

type UnicornScene = { destroy: () => void }

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => Promise<unknown>
      addScene?: (options: {
        elementId: string
        projectId: string
        lazyLoad?: boolean
        production?: boolean
        dpi?: number
      }) => Promise<UnicornScene>
    }
  }
}

const SCRIPT_SRC = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js"

// El script se carga una sola vez aunque haya varias instancias en la página.
let scriptPromise: Promise<void> | null = null
function loadUnicornStudio() {
  if (window.UnicornStudio) return Promise.resolve()
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null
      reject(new Error("No se pudo cargar Unicorn Studio"))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

// Fondo animado "Energy Beam" (Unicorn Studio). Ocupa el tamaño de su contenedor;
// para usarlo a pantalla completa, pásale className="h-screen".
const EnergyBeam: React.FC<EnergyBeamProps> = ({ projectId = "hRFfUymDGOHwtFe7evR2", className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementId = `energy-beam-${useId().replace(/[^a-zA-Z0-9-_]/g, "")}`

  useEffect(() => {
    let cancelled = false
    let scene: UnicornScene | undefined

    loadUnicornStudio()
      .then(async () => {
        const studio = window.UnicornStudio
        if (cancelled || !studio || !containerRef.current) return
        if (studio.addScene) {
          // lazyLoad: la escena solo se inicia cuando entra en pantalla.
          scene = await studio.addScene({ elementId, projectId, lazyLoad: true, production: true })
          if (cancelled) scene?.destroy()
        } else {
          await studio.init()
        }
      })
      .catch((error) => console.error(error))

    return () => {
      cancelled = true
      scene?.destroy()
    }
  }, [elementId, projectId])

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-black", className)}>
      {/* data-us-project solo lo usa init(), el método de respaldo si no hay addScene. */}
      <div ref={containerRef} id={elementId} data-us-project={projectId} className="h-full w-full" />
    </div>
  )
}

export default EnergyBeam
