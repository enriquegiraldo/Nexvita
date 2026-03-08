"use client"

import type { AnamnesisData } from "@/lib/types/anamnesis"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StepProps {
  formData: Partial<AnamnesisData>
  updateFormData: (data: Partial<AnamnesisData>) => void
  errors: Record<string, string>
}

export function PersonalStep({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Datos Personales</h2>
        <p className="text-sm text-muted-foreground">Cuéntanos sobre ti para personalizar tu experiencia.</p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input
            id="nombre"
            placeholder="Tu nombre"
            value={formData.nombre || ""}
            onChange={(e) => updateFormData({ nombre: e.target.value })}
            className={errors.nombre ? "border-destructive" : ""}
          />
          {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={formData.email || ""}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            type="tel"
            placeholder="+34 600 000 000"
            value={formData.telefono || ""}
            onChange={(e) => updateFormData({ telefono: e.target.value })}
            className={errors.telefono ? "border-destructive" : ""}
          />
          {errors.telefono && <p className="text-sm text-destructive">{errors.telefono}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="edad">Edad</Label>
          <Input
            id="edad"
            type="number"
            placeholder="25"
            min={16}
            max={100}
            value={formData.edad || ""}
            onChange={(e) => updateFormData({ edad: Number.parseInt(e.target.value) || undefined })}
            className={errors.edad ? "border-destructive" : ""}
          />
          {errors.edad && <p className="text-sm text-destructive">{errors.edad}</p>}
        </div>

        <div className="space-y-3">
          <Label>Género</Label>
          <RadioGroup
            value={formData.genero}
            onValueChange={(value) => updateFormData({ genero: value as AnamnesisData["genero"] })}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="masculino" id="masculino" />
              <Label htmlFor="masculino" className="font-normal cursor-pointer">
                Masculino
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="femenino" id="femenino" />
              <Label htmlFor="femenino" className="font-normal cursor-pointer">
                Femenino
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="otro" id="otro" />
              <Label htmlFor="otro" className="font-normal cursor-pointer">
                Otro
              </Label>
            </div>
          </RadioGroup>
          {errors.genero && <p className="text-sm text-destructive">{errors.genero}</p>}
        </div>
      </div>
    </div>
  )
}
