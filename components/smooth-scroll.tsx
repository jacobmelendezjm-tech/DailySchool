"use client"

import { useEffect } from "react"
import Lenis from "lenis"

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      // Cuanto más bajo, más suave y con más inercia (por defecto 0.1).
      lerp: 0.05,
      // Los enlaces #ancla se desplazan con una transición larga y suave,
      // respetando el scroll-margin-top de cada sección (scroll-mt-24).
      anchors: { duration: 1.8, easing: easeOutExpo },
      // Si el usuario pide reducir el movimiento en su sistema, se usa el scroll normal.
      respectReducedMotion: true,
    })
    return () => lenis.destroy()
  }, [])

  return null
}
