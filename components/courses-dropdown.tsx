"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

// Botón "Ver los cursos" del panel lateral: al pulsarlo despliega la lista de cursos
// (los enlaces llegan como children desde el servidor) y al elegir uno se cierra.
export function CoursesDropdown({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  // Se cierra con Escape o al pulsar fuera.
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

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={className}
      >
        {label}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "absolute inset-x-0 top-full z-20 pt-2 transition duration-200",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        )}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false)
        }}
      >
        <div className="max-h-80 overflow-y-auto overscroll-contain rounded-2xl border bg-popover p-2 text-popover-foreground shadow-xl ring-1 shadow-black/10 ring-black/5 dark:ring-white/5">
          {children}
        </div>
      </div>
    </div>
  )
}
