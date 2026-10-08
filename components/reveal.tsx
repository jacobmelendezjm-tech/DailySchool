"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type From = "left" | "right" | "up"

// Muestra su contenido con una transición cuando entra en pantalla al hacer scroll:
// "left" entra de izquierda a derecha, "right" de derecha a izquierda y "up" desde abajo.
// Solo se anima una vez. Los estilos están en globals.css (.reveal).
export function Reveal({
  as: Tag = "div",
  from = "up",
  delay = 0,
  className,
  style,
  children,
  ...props
}: {
  as?: "div" | "li"
  from?: From
  // Retardo en milisegundos, para escalonar elementos que entran a la vez.
  delay?: number
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.visible = ""
        observer.disconnect()
      },
      // Basta con que se vea un 10 % del elemento. (Un margen inferior negativo impedía
      // que aparecieran los elementos que quedan al final de la página.)
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", `reveal-${from}`, className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  )
}
