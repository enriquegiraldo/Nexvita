// Validaciones formales para el formulario de anamnesis
import type { AnamnesisData } from "@/lib/types/anamnesis"

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s-]{9,15}$/
  return phoneRegex.test(phone)
}

export function validatePersonalStep(data: Partial<AnamnesisData>): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.nombre || data.nombre.trim().length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres"
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = "Ingresa un email válido"
  }

  if (!data.telefono || !validatePhone(data.telefono)) {
    errors.telefono = "Ingresa un teléfono válido"
  }

  if (!data.edad || data.edad < 16 || data.edad > 100) {
    errors.edad = "La edad debe estar entre 16 y 100 años"
  }

  if (!data.genero) {
    errors.genero = "Selecciona tu género"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateFisicoStep(data: Partial<AnamnesisData>): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.peso || data.peso < 30 || data.peso > 300) {
    errors.peso = "El peso debe estar entre 30 y 300 kg"
  }

  if (!data.altura || data.altura < 100 || data.altura > 250) {
    errors.altura = "La altura debe estar entre 100 y 250 cm"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateObjetivosStep(data: Partial<AnamnesisData>): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.objetivos || data.objetivos.length === 0) {
    errors.objetivos = "Selecciona al menos un objetivo"
  }

  if (!data.nivelActividad) {
    errors.nivelActividad = "Selecciona tu nivel de actividad"
  }

  if (!data.diasEntrenamiento || data.diasEntrenamiento < 1 || data.diasEntrenamiento > 7) {
    errors.diasEntrenamiento = "Selecciona entre 1 y 7 días"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateMedicoStep(_data: Partial<AnamnesisData>): ValidationResult {
  // Campos opcionales, siempre válido
  return {
    isValid: true,
    errors: {},
  }
}

export function validatePreferenciasStep(data: Partial<AnamnesisData>): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.preferenciasAlimentarias || data.preferenciasAlimentarias.length === 0) {
    errors.preferenciasAlimentarias = "Selecciona al menos una preferencia"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
