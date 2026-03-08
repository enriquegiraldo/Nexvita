import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Drolean | Entrenamiento Personal Fitness",
  description:
    "Transforma tu cuerpo con entrenamientos personalizados. Anamnesis interactiva, rutinas a medida y seguimiento profesional.",
  generator: "v0.app",
  keywords: ["fitness", "entrenamiento personal", "nutrición", "salud", "ejercicio"],
  authors: [{ name: "Drolean" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Drolean",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://drolean.com",
    siteName: "Drolean",
    title: "Drolean | Entrenamiento Personal Fitness",
    description: "Transforma tu cuerpo con entrenamientos personalizados",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Drolean Fitness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drolean | Entrenamiento Personal Fitness",
    description: "Transforma tu cuerpo con entrenamientos personalizados",
    images: ["/og-image.png"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#10b981" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
