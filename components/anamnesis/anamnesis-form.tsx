"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type AnamnesisData, type FormState, FORM_STEPS, STEP_LABELS } from "@/lib/types/anamnesis"
import { anamnesisStorage } from "@/lib/storage/anamnesis-storage"
import {
  validatePersonalStep,
  validateFisicoStep,
  validateObjetivosStep,
  validateMedicoStep,
  validatePreferenciasStep,
} from "@/lib/validations/anamnesis"
import { StepIndicator } from "./step-indicator"
import { PersonalStep } from "./steps/personal-step"
import { FisicoStep } from "./steps/fisico-step"
import { ObjetivosStep } from "./steps/objetivos-step"
import { MedicoStep } from "./steps/medico-step"
import { PreferenciasStep } from "./steps/preferencias-step"
import { ConfirmacionStep } from "./steps/confirmacion-step"
import { SuccessScreen } from "./success-screen"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

const initialData: Partial<AnamnesisData> = {
  nombre: "",
  email: "",
  telefono: "",
  edad: undefined,
  genero: undefined,
  peso: undefined,
  altura: undefined,
  objetivos: [],
  nivelActividad: undefined,
  diasEntrenamiento: 3,
  lesiones: "",
  condicionesMedicas: "",
  medicamentos: "",
  preferenciasAlimentarias: [],
  restricciones: "",
}

export function AnamnesisForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<Partial<AnamnesisData>>(initialData)
  const [formState, setFormState] = useState<FormState>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submissionId, setSubmissionId] = useState<string>()

  const currentStep = FORM_STEPS[currentStepIndex]

  const updateFormData = useCallback((updates: Partial<AnamnesisData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
    setFormState("filling")
    const updatedKeys = Object.keys(updates)
    setErrors((prev) => {
      const newErrors = { ...prev }
      updatedKeys.forEach((key) => delete newErrors[key])
      return newErrors
    })
  }, [])

  const validateCurrentStep = useCallback((): boolean => {
    setFormState("validating")
    let result = { isValid: true, errors: {} as Record<string, string> }

    switch (currentStep) {
      case "personal":
        result = validatePersonalStep(formData)
        break
      case "fisico":
        result = validateFisicoStep(formData)
        break
      case "objetivos":
        result = validateObjetivosStep(formData)
        break
      case "medico":
        result = validateMedicoStep(formData)
        break
      case "preferencias":
        result = validatePreferenciasStep(formData)
        break
      case "confirmacion":
        result = { isValid: true, errors: {} }
        break
    }

    setErrors(result.errors)
    setFormState(result.isValid ? "filling" : "error")
    return result.isValid
  }, [currentStep, formData])

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      if (currentStepIndex < FORM_STEPS.length - 1) {
        setCurrentStepIndex((prev) => prev + 1)
        setErrors({})
      }
    }
  }, [currentStepIndex, validateCurrentStep])

  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
      setErrors({})
    }
  }, [currentStepIndex])

  const handleSubmit = useCallback(async () => {
    setFormState("submitting")

    try {
      const result = await anamnesisStorage.save(formData as any)

      if (!result.success) {
        throw new Error(result.error || "Error al guardar datos")
      }

      console.log("[v0] Anamnesis guardada exitosamente:", result.id)
      setSubmissionId(result.id)
      setFormState("success")
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      setFormState("error")
      setErrors({
        submit: error instanceof Error ? error.message : "Error al enviar el formulario. Intenta nuevamente.",
      })
    }
  }, [formData])

  if (formState === "success") {
    return <SuccessScreen nombre={formData.nombre || ""} submissionId={submissionId} />
  }

  const renderStep = () => {
    const props = { formData, updateFormData, errors }

    switch (currentStep) {
      case "personal":
        return <PersonalStep {...props} />
      case "fisico":
        return <FisicoStep {...props} />
      case "objetivos":
        return <ObjetivosStep {...props} />
      case "medico":
        return <MedicoStep {...props} />
      case "preferencias":
        return <PreferenciasStep {...props} />
      case "confirmacion":
        return <ConfirmacionStep formData={formData} />
      default:
        return null
    }
  }

  const isLastStep = currentStepIndex === FORM_STEPS.length - 1
  const isSubmitting = formState === "submitting"

  return (
    <div className="space-y-6">
      <StepIndicator steps={FORM_STEPS} currentStep={currentStepIndex} labels={STEP_LABELS} />

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {errors.submit && <p className="mt-4 text-sm text-destructive text-center">{errors.submit}</p>}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStepIndex === 0 || isSubmitting}
              className="bg-transparent"
            >
              <ArrowLeft className="mr-2" size={18} />
              Anterior
            </Button>

            {isLastStep ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Enviando...
                  </>
                ) : (
                  "Enviar Anamnesis"
                )}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Siguiente
                <ArrowRight className="ml-2" size={18} />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
