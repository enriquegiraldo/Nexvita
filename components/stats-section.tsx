"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "500+", label: "Clientes Transformados" },
  { value: "98%", label: "Tasa de Satisfacción" },
  { value: "5+", label: "Años de Experiencia" },
  { value: "24/7", label: "Soporte Continuo" },
]

export function StatsSection() {
  return (
    <section className="py-16 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
