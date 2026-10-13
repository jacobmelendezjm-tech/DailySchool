"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

const INTERVAL = 6000

type Slide = { src: string; alt: string; label: string; href: string }

// Fotos de la portada: se suceden con un fundido y un zoom lento (efecto Ken Burns).
// El indicador de arriba muestra el curso de la foto y permite saltar a cualquiera.
// Se detiene si el usuario prefiere menos movimiento o al pasar el ratón por encima.
export function HeroSlideshow({
  slides,
  className,
}: {
  slides: Slide[]
  className?: string
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      INTERVAL
    )
    return () => clearTimeout(timer)
  }, [active, paused, slides.length])

  return (
    <div
      className={cn("absolute inset-0", className)}
      onPointerEnter={(event) =>
        event.pointerType === "mouse" && setPaused(true)
      }
      onPointerLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={index === active ? slide.alt : ""}
          aria-hidden={index !== active}
          fill
          preload={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 64rem, 100vw"
          className={cn(
            "object-cover object-[45%_center] sm:object-[70%_center] transition-[opacity,scale] ease-out motion-reduce:transition-none",
            index === active
              ? "scale-100 opacity-100 duration-[1200ms,7000ms]"
              : "scale-110 opacity-0 [transition-delay:0ms,1200ms] duration-[1200ms,0ms]"
          )}
        />
      ))}
      {/* Oscurece un poco la foto para que el indicador y la etiqueta se lean sobre cualquier imagen. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/20" />

      <div className="absolute top-4 right-4 flex items-center gap-3 rounded-full border border-white/20 bg-black/30 py-2 pr-2 pl-4 text-white backdrop-blur-md sm:top-6 sm:right-6">
        <a
          href={slides[active].href}
          aria-live="polite"
          className="max-w-36 truncate text-xs font-medium hover:underline sm:max-w-none sm:text-sm"
        >
          {slides[active].label}
        </a>
        <div className="flex items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver foto: ${slide.label}`}
              aria-current={index === active}
              className="group relative flex h-5 items-center"
            >
              <span
                className={cn(
                  "block h-1.5 overflow-hidden rounded-full bg-white/40 transition-all duration-500",
                  index === active ? "w-7" : "w-1.5 group-hover:bg-white/70"
                )}
              >
                {/* Barra de progreso hasta la siguiente foto. */}
                {index === active && (
                  <span
                    key={`${active}-${paused}`}
                    className={cn(
                      "block h-full origin-left rounded-full bg-white motion-reduce:animate-none",
                      paused
                        ? "w-full"
                        : "animate-[slide-progress_linear_forwards]"
                    )}
                    style={{ animationDuration: `${INTERVAL}ms` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
