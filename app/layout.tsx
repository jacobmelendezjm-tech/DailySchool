import { Geist, Geist_Mono, Inter } from "next/font/google"

import "lenis/dist/lenis.css"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <SmoothScroll />
        {/* Empieza en modo claro; el botón luna del menú cambia a modo oscuro (y se recuerda). */}
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}
