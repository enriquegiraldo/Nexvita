"use client"

import { useEffect } from "react"

export function PWARegister() {
  useEffect(() => {
    // Solo registrar Service Worker en producción con dominio propio
    // Los previews de v0/Vercel no soportan SW correctamente
    const isProduction = 
      typeof window !== "undefined" &&
      !window.location.hostname.includes("vusercontent.net") &&
      !window.location.hostname.includes("localhost") &&
      !window.location.hostname.includes("127.0.0.1")

    if (!isProduction) {
      return
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          // Verificar actualizaciones cada hora
          setInterval(
            () => {
              registration.update()
            },
            60 * 60 * 1000,
          )
        })
        .catch(() => {
          // Silenciar errores en entornos donde SW no está soportado
        })
    }
  }, [])

  return null
}
