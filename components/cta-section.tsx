"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-card to-card" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--border)_1px,_transparent_1px),linear-gradient(to_bottom,_var(--border)_1px,_transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

          <div className="relative z-10 py-16 px-6 sm:px-12 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              ¿Listo para comenzar tu
              <span className="text-primary"> transformación</span>?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Completa tu anamnesis en menos de 5 minutos y recibe un plan personalizado diseñado específicamente para
              tus objetivos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-base px-8 py-6">
                <Link href="/anamnesis">
                  Comenzar Ahora
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
