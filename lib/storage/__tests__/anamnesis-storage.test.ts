import { AnamnesisStorage } from "../anamnesis-storage"
import type { AnamnesisFormData } from "@/lib/types/anamnesis"
import { jest } from "@jest/globals"

// Mock del cliente Supabase
jest.mock("@/lib/supabase/client", () => ({
  getSupabaseClient: jest.fn(() => null),
}))

describe("AnamnesisStorage - Pruebas de Integración", () => {
  let storage: AnamnesisStorage

  beforeEach(() => {
    storage = new AnamnesisStorage()
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  const mockFormData: AnamnesisFormData = {
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com",
    telefono: "+5491112345678",
    edad: 30,
    genero: "masculino",
    peso: 70,
    altura: 1.75,
    nivelActividad: "moderado",
    experienciaEjercicio: "intermedio",
    objetivoPrincipal: "perder_peso",
    objetivosEspecificos: ["reducir_grasa", "mejorar_resistencia"],
    tiempoDisponible: "60_minutos",
    condicionesMedicas: [],
    lesionesPrevias: [],
    medicamentosActuales: [],
    lugaresEntrenamiento: ["gimnasio"],
    equipamientoDisponible: ["mancuernas", "barra"],
    diasPreferidos: ["lunes", "miercoles", "viernes"],
    horariosPreferidos: ["manana"],
  }

  describe("save", () => {
    it("debe guardar datos en localStorage cuando Supabase no está configurado", async () => {
      const result = await storage.save(mockFormData)

      expect(result.success).toBe(true)
      expect(result.id).toBeDefined()

      const saved = localStorage.getItem("drolean_anamnesis_submissions")
      expect(saved).toBeTruthy()

      const parsed = JSON.parse(saved!)
      expect(parsed).toHaveLength(1)
      expect(parsed[0].nombre).toBe("Juan Pérez")
    })

    it("debe generar ID único para cada submission", async () => {
      const result1 = await storage.save(mockFormData)
      const result2 = await storage.save({ ...mockFormData, nombre: "María García" })

      expect(result1.id).not.toBe(result2.id)
    })

    it("debe manejar errores de forma segura", async () => {
      // Mock para forzar error en localStorage
      jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage full")
      })

      const result = await storage.save(mockFormData)

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })

  describe("getAll", () => {
    it("debe retornar lista vacía cuando no hay datos", async () => {
      const result = await storage.getAll()
      expect(result).toEqual([])
    })

    it("debe retornar todos los submissions guardados", async () => {
      await storage.save(mockFormData)
      await storage.save({ ...mockFormData, nombre: "María García" })

      const result = await storage.getAll()
      expect(result).toHaveLength(2)
    })
  })

  describe("getById", () => {
    it("debe retornar null para ID inexistente", async () => {
      const result = await storage.getById("id-inexistente")
      expect(result).toBeNull()
    })

    it("debe retornar el submission correcto por ID", async () => {
      const saveResult = await storage.save(mockFormData)
      const result = await storage.getById(saveResult.id!)

      expect(result).toBeTruthy()
      expect(result?.nombre).toBe("Juan Pérez")
    })
  })
})
