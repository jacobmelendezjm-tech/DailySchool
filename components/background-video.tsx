"use client"

import { useEffect, useRef } from "react"

// Video de fondo que solo se descarga y reproduce cuando su sección está cerca de la pantalla,
// y se pausa al salir de ella. Así la página no descarga todos los videos al abrirse.
export function BackgroundVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.src = src
          // Con "reducir movimiento" activado se muestra el primer fotograma, sin reproducir.
          if (!reducedMotion) video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: "300px 0px" }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return <video ref={ref} muted loop playsInline preload="metadata" className="size-full object-cover" />
}
