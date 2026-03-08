"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import type { FormStep } from "@/lib/types/anamnesis"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  steps: FormStep[]
  currentStep: number
  labels: Record<FormStep, string>
}

export function StepIndicator({ steps, currentStep, labels }: StepIndicatorProps) {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />

      {/* Active progress bar */}
      <motion.div
        className="absolute top-4 left-0 h-0.5 bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                  isCompleted && "bg-primary border-primary text-primary-foreground",
                  isCurrent && "bg-primary/20 border-primary text-primary",
                  !isCompleted && !isCurrent && "bg-card border-border text-muted-foreground",
                )}
                initial={false}
                animate={isCompleted ? { scale: [1, 1.1, 1] } : {}}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-xs hidden sm:block text-center max-w-[80px]",
                  isCurrent ? "text-primary font-medium" : "text-muted-foreground",
                )}
              >
                {labels[step]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
