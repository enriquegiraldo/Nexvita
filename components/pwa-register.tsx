"use client"

import { useEffect } from "react"

export function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[v0] Service Worker registrado:", registration.scope)

          // Verificar actualizaciones cada hora
          setInterval(
            () => {
              registration.update()
            },
            60 * 60 * 1000,
          )
        })
        .catch((error) => {
          console.error("[v0] Error registrando Service Worker:", error)
        })
    }
  }, [])

  return null
}
