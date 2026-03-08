"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María García",
    role: "Perdió 15kg en 4 meses",
    content: "Drolean cambió mi vida. El plan personalizado fue exactamente lo que necesitaba para alcanzar mis metas.",
    image: "/professional-woman-portrait.png",
  },
  {
    name: "Carlos Rodríguez",
    role: "Ganó 8kg de músculo",
    content: "El seguimiento constante y los ajustes semanales marcaron la diferencia. Resultados que nunca imaginé.",
    image: "/man-portrait-professional-fitness.jpg",
  },
  {
    name: "Ana Martínez",
    role: "Mejoró su rendimiento",
    content:
      "Como atleta, necesitaba un entrenador que entendiera mis necesidades específicas. Drolean superó mis expectativas.",
    image: "/woman-athlete-portrait.png",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Historias de <span className="text-primary">éxito</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Personas reales que transformaron sus vidas con nuestro método.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6">{`"${testimonial.content}"`}</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
