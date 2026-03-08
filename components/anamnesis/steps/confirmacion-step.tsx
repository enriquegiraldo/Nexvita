"use client"

import type { AnamnesisData } from "@/lib/types/anamnesis"
import { CheckCircle } from "lucide-react"

interface ConfirmacionStepProps {
  formData: Partial<AnamnesisData>
}

export function ConfirmacionStep({ formData }: ConfirmacionStepProps) {
  const objetivosLabels: Record<string, string> = {
    perder_peso: "Perder peso",
    ganar_musculo: "Ganar músculo",
    mejorar_salud: "Mejorar salud",
    aumentar_fuerza: "Aumentar fuerza",
    mejorar_resistencia: "Mejorar resistencia",
    tonificar: "Tonificar cuerpo",
  }

  const actividadLabels: Record<string, string> = {
    sedentario: "Sedentario",
    ligero: "Ligero",
    moderado: "Moderado",
    activo: "Activo",
    muy_activo: "Muy activo",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Confirma tus datos</h2>
        <p className="text-sm text-muted-foreground">Revisa la información antes de enviar.</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <h3 className="font-medium text-foreground mb-2">Datos Personales</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-muted-foreground">Nombre:</p>
            <p className="text-foreground">{formData.nombre}</p>
            <p className="text-muted-foreground">Email:</p>
            <p className="text-foreground">{formData.email}</p>
            <p className="text-muted-foreground">Teléfono:</p>
            <p className="text-foreground">{formData.telefono}</p>
            <p className="text-muted-foreground">Edad:</p>
            <p className="text-foreground">{formData.edad} años</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <h3 className="font-medium text-foreground mb-2">Datos Físicos</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-muted-foreground">Peso:</p>
            <p className="text-foreground">{formData.peso} kg</p>
            <p className="text-muted-foreground">Altura:</p>
            <p className="text-foreground">{formData.altura} cm</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <h3 className="font-medium text-foreground mb-2">Objetivos</h3>
          <div className="flex flex-wrap gap-2">
            {formData.objetivos?.map((obj) => (
              <span key={obj} className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                {objetivosLabels[obj] || obj}
              </span>
            ))}
          </div>
          <p className="text-sm mt-2">
            <span className="text-muted-foreground">Nivel:</span>{" "}
            <span className="text-foreground">{actividadLabels[formData.nivelActividad || ""]}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Días de entrenamiento:</span>{" "}
            <span className="text-foreground">{formData.diasEntrenamiento}/semana</span>
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Todo listo para enviar</p>
            <p className="text-sm text-muted-foreground">
              Al enviar, aceptas que procesemos tus datos para crear tu plan personalizado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
