"use client"

import type { AnamnesisData } from "@/lib/types/anamnesis"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StepProps {
  formData: Partial<AnamnesisData>
  updateFormData: (data: Partial<AnamnesisData>) => void
  errors: Record<string, string>
}

export function FisicoStep({ formData, updateFormData, errors }: StepProps) {
  // Calcular IMC
  const imc = formData.peso && formData.altura ? (formData.peso / Math.pow(formData.altura / 100, 2)).toFixed(1) : null

  const getImcCategory = (imc: number) => {
    if (imc < 18.5) return { label: "Bajo peso", color: "text-yellow-500" }
    if (imc < 25) return { label: "Normal", color: "text-primary" }
    if (imc < 30) return { label: "Sobrepeso", color: "text-orange-500" }
    return { label: "Obesidad", color: "text-red-500" }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Datos Físicos</h2>
        <p className="text-sm text-muted-foreground">Estos datos nos ayudan a calcular tus necesidades.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="peso">Peso (kg)</Label>
          <Input
            id="peso"
            type="number"
            placeholder="70"
            min={30}
            max={300}
            value={formData.peso || ""}
            onChange={(e) => updateFormData({ peso: Number.parseFloat(e.target.value) || undefined })}
            className={errors.peso ? "border-destructive" : ""}
          />
          {errors.peso && <p className="text-sm text-destructive">{errors.peso}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="altura">Altura (cm)</Label>
          <Input
            id="altura"
            type="number"
            placeholder="175"
            min={100}
            max={250}
            value={formData.altura || ""}
            onChange={(e) => updateFormData({ altura: Number.parseFloat(e.target.value) || undefined })}
            className={errors.altura ? "border-destructive" : ""}
          />
          {errors.altura && <p className="text-sm text-destructive">{errors.altura}</p>}
        </div>
      </div>

      {imc && (
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">Tu Índice de Masa Corporal (IMC)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-foreground">{imc}</span>
            <span className={`text-sm font-medium ${getImcCategory(Number.parseFloat(imc)).color}`}>
              {getImcCategory(Number.parseFloat(imc)).label}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
