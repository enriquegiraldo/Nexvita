"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react"

interface SuccessScreenProps {
  nombre: string
  submissionId?: string
}

export function SuccessScreen({ nombre, submissionId }: SuccessScreenProps) {
  const whatsappMessage = submissionId
    ? `Hola! Acabo de completar mi anamnesis. Mi nombre es ${nombre}. ID: ${submissionId}`
    : `Hola! Acabo de completar mi anamnesis. Mi nombre es ${nombre}.`

  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="bg-card border-border text-center">
        <CardContent className="pt-12 pb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-primary" />
          </motion.div>

          <h2 className="text-2xl font-bold text-foreground mb-2">¡Gracias, {nombre}!</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Tu anamnesis ha sido enviada correctamente. Revisaremos tus datos y te contactaremos pronto con tu plan
            personalizado.
          </p>

          {submissionId && (
            <p className="text-xs text-muted-foreground mb-4 font-mono">ID de referencia: {submissionId.slice(0, 8)}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#25D366] hover:bg-[#20bd5a] text-white">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" size={18} />
                Contactar por WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/">
                Volver al inicio
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
