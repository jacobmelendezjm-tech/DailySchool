"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ReviewsCarousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null)

  function scroll(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  return (
    <div>
      <ul
        ref={trackRef}
        // Los gestos horizontales sobre el carrusel usan el scroll nativo, no el de Lenis.
        data-lenis-prevent-horizontal
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="icon-lg" className="rounded-full" onClick={() => scroll(-1)} aria-label="Opinión anterior">
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon-lg" className="rounded-full" onClick={() => scroll(1)} aria-label="Opinión siguiente">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
