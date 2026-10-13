import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "lenis/dist/lenis.css"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// URL pública: en Vercel se toma del dominio de producción; en local, localhost.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000"

const title = "DailySchool · Lo que siempre necesitaste saber y nadie te enseñó"
const description =
  "Cursos breves, prácticos y presenciales en Madrid para aprender a cambiar un enchufe, coser un botón, usar un taladro, cocinar o entender tus facturas. Grupos reducidos e instructores profesionales."

// El favicon (app/icon.svg), el icono de iPhone (app/apple-icon.png) y la imagen
// para redes sociales (app/opengraph-image.png) los añade Next automáticamente.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "DailySchool",
  keywords: [
    "cursos prácticos",
    "bricolaje",
    "habilidades para la vida",
    "cursos presenciales Madrid",
    "cambiar un enchufe",
    "coser un botón",
    "usar un taladro",
    "cocina básica",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "DailySchool",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <SmoothScroll />
        {/* Empieza en modo claro; el botón luna del menú cambia a modo oscuro (y se recuerda). */}
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}
