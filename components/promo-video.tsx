"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"

import { cn } from "@/lib/utils"

const controlClass =
  "flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"

// Vídeo de presentación: se reproduce en silencio y en bucle mientras está en pantalla
// y se pausa al salir (ahorra batería y datos). Los navegadores solo permiten la
// reproducción automática sin sonido; el botón del altavoz activa el audio.
// Con "reducir movimiento" activado no arranca solo: hay que pulsar reproducir.
export function PromoVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string
  poster: string
  label: string
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  // Si el usuario pausa a mano, no se vuelve a reproducir solo al hacer scroll.
  const pausedByUser = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) {
          video.play().catch(() => {})
        } else if (!entry.isIntersecting) {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      pausedByUser.current = false
      video.play().catch(() => {})
    } else {
      pausedByUser.current = true
      video.pause()
    }
  }

  function toggleSound() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
    if (!video.muted && video.paused) {
      pausedByUser.current = false
      video.play().catch(() => {})
    }
  }

  return (
    <div
      className={cn(
        "group relative aspect-video overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 shadow-black/10 ring-black/5 dark:ring-white/10",
        className
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          const { currentTime, duration } = event.currentTarget
          if (duration) setProgress(currentTime / duration)
        }}
        className="size-full cursor-pointer object-cover"
      />

      {/* Botón grande de reproducir mientras está en pausa. */}
      <button
        type="button"
        onClick={togglePlay}
        tabIndex={-1}
        aria-hidden
        className={cn(
          "absolute inset-0 m-auto flex size-20 cursor-pointer items-center justify-center rounded-full bg-white/90 text-blue-700 shadow-2xl backdrop-blur transition duration-300 hover:scale-105 sm:size-24",
          playing ? "pointer-events-none scale-90 opacity-0" : "opacity-100"
        )}
      >
        <Play className="ml-1 size-8 fill-current sm:size-10" />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/50 to-transparent" />

      <div className="absolute right-3 bottom-4 flex gap-2 sm:right-5 sm:bottom-5">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar el vídeo" : "Reproducir el vídeo"}
          className={controlClass}
        >
          {playing ? (
            <Pause className="size-4 fill-current" aria-hidden />
          ) : (
            <Play className="ml-0.5 size-4 fill-current" aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Activar el sonido" : "Silenciar el vídeo"}
          aria-pressed={!muted}
          className={cn(controlClass, "sm:w-auto sm:gap-2 sm:px-3.5")}
        >
          {muted ? (
            <VolumeX className="size-4" aria-hidden />
          ) : (
            <Volume2 className="size-4" aria-hidden />
          )}
          <span className="hidden text-xs font-medium sm:inline">
            {muted ? "Activar sonido" : "Sonido activado"}
          </span>
        </button>
      </div>

      {/* Progreso del vídeo. */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
        <div
          className="h-full origin-left bg-amber-400"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  )
}
