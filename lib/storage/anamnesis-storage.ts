// Capa de abstracción para almacenamiento de anamnesis
// Usa Supabase si está disponible, localStorage como fallback

import { getSupabaseClient } from "@/lib/supabase/client"
import type { AnamnesisData, AnamnesisFormData } from "@/lib/types/anamnesis"

const STORAGE_KEY = "drolean_anamnesis_submissions"

export class AnamnesisStorage {
  private supabase = getSupabaseClient()

  async save(data: AnamnesisFormData): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      // Intentar guardar en Supabase primero
      if (this.supabase) {
        return await this.saveToSupabase(data)
      }

      // Fallback a localStorage
      return this.saveToLocalStorage(data)
    } catch (error) {
      console.error("[v0] Error guardando anamnesis:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  private async saveToSupabase(data: AnamnesisFormData) {
    if (!this.supabase) {
      throw new Error("Cliente Supabase no disponible")
    }

    const { data: result, error } = await this.supabase
      .from("anamnesis")
      .insert([
        {
          // Datos personales
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          edad: data.edad,
          genero: data.genero,

          // Datos físicos
          peso: data.peso,
          altura: data.altura,
          nivel_actividad: data.nivelActividad,
          experiencia_ejercicio: data.experienciaEjercicio,

          // Objetivos
          objetivo_principal: data.objetivoPrincipal,
          objetivos_especificos: data.objetivosEspecificos,
          tiempo_disponible: data.tiempoDisponible,

          // Datos médicos
          condiciones_medicas: data.condicionesMedicas,
          lesiones_previas: data.lesionesPrevias,
          medicamentos_actuales: data.medicamentosActuales,
          restricciones_fisicas: data.restriccionesFisicas,

          // Preferencias
          lugares_entrenamiento: data.lugaresEntrenamiento,
          equipamiento_disponible: data.equipamientoDisponible,
          dias_preferidos: data.diasPreferidos,
          horarios_preferidos: data.horariosPreferidos,
          notas_adicionales: data.notasAdicionales,

          status: "pendiente",
        },
      ])
      .select("id")
      .single()

    if (error) {
      throw error
    }

    return {
      success: true,
      id: result.id,
    }
  }

  private saveToLocalStorage(data: AnamnesisFormData) {
    // Obtener submissions existentes
    const existingData = localStorage.getItem(STORAGE_KEY)
    const submissions = existingData ? JSON.parse(existingData) : []

    // Crear nuevo submission con ID único
    const newSubmission = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      status: "pendiente",
    }

    // Agregar y guardar
    submissions.push(newSubmission)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))

    console.warn("[v0] Datos guardados en localStorage (temporal). Configura Supabase para persistencia real.")

    return {
      success: true,
      id: newSubmission.id,
    }
  }

  async getAll(): Promise<AnamnesisData[]> {
    if (this.supabase) {
      const { data, error } = await this.supabase
        .from("anamnesis")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error obteniendo anamnesis:", error)
        return []
      }

      return data || []
    }

    // Fallback a localStorage
    const existingData = localStorage.getItem(STORAGE_KEY)
    return existingData ? JSON.parse(existingData) : []
  }

  async getById(id: string): Promise<AnamnesisData | null> {
    if (this.supabase) {
      const { data, error } = await this.supabase.from("anamnesis").select("*").eq("id", id).single()

      if (error) {
        console.error("[v0] Error obteniendo anamnesis:", error)
        return null
      }

      return data
    }

    // Fallback a localStorage
    const all = await this.getAll()
    return all.find((item) => item.id === id) || null
  }
}

// Instancia singleton
export const anamnesisStorage = new AnamnesisStorage()
