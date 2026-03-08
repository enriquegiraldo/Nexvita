"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Apple, LineChart, Users } from "lucide-react"

const services = [
  {
    icon: Dumbbell,
    title: "Entrenamiento Personalizado",
    description:
      "Rutinas diseñadas específicamente para tus objetivos, nivel de condición física y disponibilidad de tiempo.",
  },
  {
    icon: Apple,
    title: "Plan Nutricional",
    description: "Guías de alimentación adaptadas a tu metabolismo, preferencias y metas de composición corporal.",
  },
  {
    icon: LineChart,
    title: "Seguimiento de Progreso",
    description: "Monitoreo constante de tus avances con métricas claras y ajustes según tu evolución.",
  },
  {
    icon: Users,
    title: "Soporte Dedicado",
    description: "Acompañamiento continuo vía WhatsApp para resolver dudas y mantener tu motivación alta.",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Todo lo que necesitas para tu
            <span className="text-primary"> transformación</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Un enfoque integral que combina entrenamiento, nutrición y acompañamiento profesional.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
