import { cn } from "@/lib/utils"

// Símbolo de DailySchool: el tejado de una casa con un sol que sale bajo él
// ("el día a día en casa"). Es el mismo dibujo que app/icon.svg (favicon).
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={cn("size-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" className="fill-blue-600" />
      <path
        d="M7 15 16 7l9 8"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 24a6.5 6.5 0 0 1 13 0z" className="fill-amber-400" />
      <path
        d="M7 24h18"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Logotipo completo: símbolo + nombre ("School" en el azul de la marca).
export function Logo({
  className,
  markClassName,
  wordmarkClassName,
}: {
  className?: string
  markClassName?: string
  wordmarkClassName?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className
      )}
    >
      <LogoMark className={markClassName} />
      <span className={wordmarkClassName}>
        Daily<span className="text-blue-600 dark:text-blue-400">School</span>
      </span>
    </span>
  )
}
