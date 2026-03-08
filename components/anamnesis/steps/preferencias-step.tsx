"use client"

import type { AnamnesisData } from "@/lib/types/anamnesis"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface StepProps {
  formData: Partial<AnamnesisData>
  updateFormData: (data: Partial<AnamnesisData>) => void
  errors: Record<string, string>
}

const preferenciasOptions = [
  { id: "omnivoro", label: "Omnívoro" },
  { id: "vegetariano", label: "Vegetariano" },
  { id: "vegano", label: "Vegano" },
  { id: "sin_gluten", label: "Sin gluten" },
  { id: "sin_lactosa", label: "Sin lactosa" },
  { id: "keto", label: "Keto/Low carb" },
]

export function PreferenciasStep({ formData, updateFormData, errors }: StepProps) {
  const selectedPreferencias = formData.preferenciasAlimentarias || []

  const togglePreferencia = (id: string) => {
    const newPreferencias = selectedPreferencias.includes(id)
      ? selectedPreferencias.filter((p) => p !== id)
      : [...selectedPreferencias, id]
    updateFormData({ preferenciasAlimentarias: newPreferencias })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Preferencias Alimentarias</h2>
        <p className="text-sm text-muted-foreground">Personaliza tu plan nutricional según tus preferencias.</p>
      </div>

      <div className="space-y-3">
        <Label>Tipo de alimentación</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {preferenciasOptions.map((pref) => (
            <button
              key={pref.id}
              type="button"
              onClick={() => togglePreferencia(pref.id)}
              className={cn(
                "p-3 rounded-lg border text-center transition-all",
                selectedPreferencias.includes(pref.id)
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card hover:border-primary/50 text-muted-foreground",
              )}
            >
              {pref.label}
            </button>
          ))}
        </div>
        {errors.preferenciasAlimentarias && (
          <p className="text-sm text-destructive">{errors.preferenciasAlimentarias}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="restricciones">Alergias o restricciones adicionales</Label>
        <Textarea
          id="restricciones"
          placeholder="Alergias a frutos secos, mariscos, etc..."
          value={formData.restricciones || ""}
          onChange={(e) => updateFormData({ restricciones: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}
