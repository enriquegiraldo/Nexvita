"use client"

import type { AnamnesisData } from "@/lib/types/anamnesis"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface StepProps {
  formData: Partial<AnamnesisData>
  updateFormData: (data: Partial<AnamnesisData>) => void
  errors: Record<string, string>
}

const objetivosOptions = [
  { id: "perder_peso", label: "Perder peso" },
  { id: "ganar_musculo", label: "Ganar músculo" },
  { id: "mejorar_salud", label: "Mejorar salud general" },
  { id: "aumentar_fuerza", label: "Aumentar fuerza" },
  { id: "mejorar_resistencia", label: "Mejorar resistencia" },
  { id: "tonificar", label: "Tonificar cuerpo" },
]

const nivelActividadOptions = [
  { value: "sedentario", label: "Sedentario", desc: "Poco o nada de ejercicio" },
  { value: "ligero", label: "Ligero", desc: "Ejercicio 1-2 días/semana" },
  { value: "moderado", label: "Moderado", desc: "Ejercicio 3-4 días/semana" },
  { value: "activo", label: "Activo", desc: "Ejercicio 5-6 días/semana" },
  { value: "muy_activo", label: "Muy activo", desc: "Ejercicio intenso diario" },
]

export function ObjetivosStep({ formData, updateFormData, errors }: StepProps) {
  const selectedObjetivos = formData.objetivos || []

  const toggleObjetivo = (id: string) => {
    const newObjetivos = selectedObjetivos.includes(id)
      ? selectedObjetivos.filter((o) => o !== id)
      : [...selectedObjetivos, id]
    updateFormData({ objetivos: newObjetivos })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Tus Objetivos</h2>
        <p className="text-sm text-muted-foreground">Define qué quieres lograr con tu entrenamiento.</p>
      </div>

      <div className="space-y-3">
        <Label>Objetivos principales (selecciona uno o más)</Label>
        <div className="grid grid-cols-2 gap-3">
          {objetivosOptions.map((objetivo) => (
            <button
              key={objetivo.id}
              type="button"
              onClick={() => toggleObjetivo(objetivo.id)}
              className={cn(
                "p-3 rounded-lg border text-left transition-all",
                selectedObjetivos.includes(objetivo.id)
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card hover:border-primary/50 text-muted-foreground",
              )}
            >
              {objetivo.label}
            </button>
          ))}
        </div>
        {errors.objetivos && <p className="text-sm text-destructive">{errors.objetivos}</p>}
      </div>

      <div className="space-y-3">
        <Label>Nivel de actividad actual</Label>
        <RadioGroup
          value={formData.nivelActividad}
          onValueChange={(value) => updateFormData({ nivelActividad: value as AnamnesisData["nivelActividad"] })}
          className="space-y-2"
        >
          {nivelActividadOptions.map((option) => (
            <div key={option.value} className="flex items-start space-x-3">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="font-normal cursor-pointer">
                <span className="font-medium text-foreground">{option.label}</span>
                <span className="text-muted-foreground text-sm ml-2">{option.desc}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.nivelActividad && <p className="text-sm text-destructive">{errors.nivelActividad}</p>}
      </div>

      <div className="space-y-3">
        <Label>Días de entrenamiento por semana: {formData.diasEntrenamiento || 3}</Label>
        <Slider
          value={[formData.diasEntrenamiento || 3]}
          onValueChange={([value]) => updateFormData({ diasEntrenamiento: value })}
          min={1}
          max={7}
          step={1}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 día</span>
          <span>7 días</span>
        </div>
        {errors.diasEntrenamiento && <p className="text-sm text-destructive">{errors.diasEntrenamiento}</p>}
      </div>
    </div>
  )
}
