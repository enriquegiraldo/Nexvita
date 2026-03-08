// Esquema formal TypeScript para datos de anamnesis (Especificación Formal)
export interface AnamnesisData {
  id?: string
  // Datos personales
  nombre: string
  email: string
  telefono: string
  edad: number
  genero: "masculino" | "femenino" | "otro"

  // Datos físicos
  peso: number
  altura: number

  // Objetivos y estilo de vida
  objetivos: string[]
  nivelActividad: "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo"
  diasEntrenamiento: number

  // Historial médico
  lesiones: string
  condicionesMedicas: string
  medicamentos: string

  // Preferencias
  preferenciasAlimentarias: string[]
  restricciones: string

  // Metadata
  fechaCreacion?: Date
  estado?: "pendiente" | "revisado" | "activo"
}

// Estados del formulario (State Machine)
export type FormState = "idle" | "filling" | "validating" | "submitting" | "success" | "error"

// Pasos del formulario
export type FormStep = "personal" | "fisico" | "objetivos" | "medico" | "preferencias" | "confirmacion"

export const FORM_STEPS: FormStep[] = ["personal", "fisico", "objetivos", "medico", "preferencias", "confirmacion"]

export const STEP_LABELS: Record<FormStep, string> = {
  personal: "Datos Personales",
  fisico: "Datos Físicos",
  objetivos: "Objetivos",
  medico: "Historial Médico",
  preferencias: "Preferencias",
  confirmacion: "Confirmación",
}

export interface AnamnesisFormData {
  // Datos personales
  nombre: string
  email: string
  telefono: string
  edad: number
  genero: string

  // Datos físicos
  peso: number
  altura: number
  nivelActividad: string
  experienciaEjercicio: string

  // Objetivos
  objetivoPrincipal: string
  objetivosEspecificos: string[]
  tiempoDisponible: string

  // Datos médicos
  condicionesMedicas: string[]
  lesionesPrevias: string[]
  medicamentosActuales: string[]
  restriccionesFisicas?: string

  // Preferencias
  lugaresEntrenamiento: string[]
  equipamientoDisponible: string[]
  diasPreferidos: string[]
  horariosPreferidos: string[]
  notasAdicionales?: string
}
