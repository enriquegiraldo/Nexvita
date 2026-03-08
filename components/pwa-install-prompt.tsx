"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Mostrar prompt después de 5 segundos si no se ha instalado
      setTimeout(() => {
        const hasBeenDismissed = localStorage.getItem("pwa-prompt-dismissed")
        if (!hasBeenDismissed) {
          setShowPrompt(true)
        }
      }, 5000)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    console.log(`[v0] PWA install outcome: ${outcome}`)

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    localStorage.setItem("pwa-prompt-dismissed", "true")
    setShowPrompt(false)
  }

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-40 md:left-auto md:right-8 md:max-w-sm"
        >
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-4">
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              <h3 className="font-bold text-foreground mb-2">Instalar Drolean</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Instala la app para acceso rápido y funcionalidad offline
              </p>

              <Button onClick={handleInstall} className="w-full">
                <Download className="mr-2" size={18} />
                Instalar App
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
