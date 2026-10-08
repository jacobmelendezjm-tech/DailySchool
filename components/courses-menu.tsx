"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

// Botón "Cursos" del menú: al pasar el ratón (o al pulsarlo, en móvil y con teclado)
// despliega una pequeña isla con los cursos. Los enlaces llegan como children desde el servidor.
export function CoursesMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const panelId = useId()

  const show = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  // Pequeño retardo para que la isla no se cierre al mover el ratón del botón a ella.
  const hide = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && show()}
      onPointerLeave={(event) => event.pointerType === "mouse" && hide()}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-expanded:text-foreground"
      >
        Cursos
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {/* pt-3 en vez de margen: así no hay hueco entre el botón y la isla donde se perdería el hover. */}
      <div
        id={panelId}
        className={cn(
          "absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 transition duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        )}
        // Al elegir un curso, se cierra la isla.
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false)
        }}
      >
        <div className="rounded-2xl border bg-popover/95 p-2 text-popover-foreground shadow-xl ring-1 shadow-black/30 ring-white/5">
          {children}
        </div>
      </div>
    </div>
  )
}
