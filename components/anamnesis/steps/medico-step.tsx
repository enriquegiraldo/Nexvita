"use client"

import type { AnamnesisData } from "@/lib/types/anamnesis"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface StepProps {
  formData: Partial<AnamnesisData>
  updateFormData: (data: Partial<AnamnesisData>) => void
  errors: Record<string, string>
}

export function MedicoStep({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Historial Médico</h2>
        <p className="text-sm text-muted-foreground">
          Esta información es confidencial y nos ayuda a crear un plan seguro para ti.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lesiones">Lesiones previas o actuales</Label>
          <Textarea
            id="lesiones"
            placeholder="Describe cualquier lesión que hayas tenido o tengas actualmente..."
            value={formData.lesiones || ""}
            onChange={(e) => updateFormData({ lesiones: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="condicionesMedicas">Condiciones médicas</Label>
          <Textarea
            id="condicionesMedicas"
            placeholder="Diabetes, hipertensión, problemas cardíacos, etc..."
            value={formData.condicionesMedicas || ""}
            onChange={(e) => updateFormData({ condicionesMedicas: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicamentos">Medicamentos actuales</Label>
          <Textarea
            id="medicamentos"
            placeholder="Lista los medicamentos que tomas actualmente..."
            value={formData.medicamentos || ""}
            onChange={(e) => updateFormData({ medicamentos: e.target.value })}
            rows={3}
          />
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">
          Estos campos son opcionales, pero proporcionarlos nos permite crear un plan más seguro y efectivo para ti.
        </p>
      </div>
    </div>
  )
}
