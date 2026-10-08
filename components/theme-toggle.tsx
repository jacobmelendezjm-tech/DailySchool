"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// Botón luna/sol para cambiar entre modo claro y oscuro. Los iconos se alternan con CSS
// (dark:), así el servidor y el navegador pintan lo mismo y no hay parpadeo al cargar.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Cambiar entre modo claro y oscuro"
      className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
    >
      <Moon className="size-4.5 dark:hidden" aria-hidden />
      <Sun className="hidden size-4.5 dark:block" aria-hidden />
    </button>
  )
}
