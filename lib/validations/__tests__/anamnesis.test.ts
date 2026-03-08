import {
  validatePersonalStep,
  validateFisicoStep,
  validateObjetivosStep,
  validateMedicoStep,
  validatePreferenciasStep,
  validateEmail,
  validatePhone,
} from "../anamnesis"

describe("Validaciones de Anamnesis - Métodos Formales", () => {
  describe("validateEmail", () => {
    it("debe validar emails correctos", () => {
      expect(validateEmail("usuario@ejemplo.com")).toBe(true)
      expect(validateEmail("test.user+tag@domain.co")).toBe(true)
    })

    it("debe rechazar emails inválidos", () => {
      expect(validateEmail("")).toBe(false)
      expect(validateEmail("sin-arroba.com")).toBe(false)
      expect(validateEmail("@sin-usuario.com")).toBe(false)
      expect(validateEmail("espacios @dominio.com")).toBe(false)
    })
  })

  describe("validatePhone", () => {
    it("debe validar teléfonos correctos", () => {
      expect(validatePhone("+5491112345678")).toBe(true)
      expect(validatePhone("1234567890")).toBe(true)
    })

    it("debe rechazar teléfonos inválidos", () => {
      expect(validatePhone("")).toBe(false)
      expect(validatePhone("123")).toBe(false)
      expect(validatePhone("abc123")).toBe(false)
    })
  })

  describe("validatePersonalStep", () => {
    const validData = {
      nombre: "Juan Pérez",
      email: "juan@ejemplo.com",
      telefono: "+5491112345678",
      edad: 30,
      genero: "masculino",
    }

    it("debe validar datos personales correctos", () => {
      const result = validatePersonalStep(validData)
      expect(result.isValid).toBe(true)
      expect(Object.keys(result.errors)).toHaveLength(0)
    })

    it("debe detectar nombre faltante", () => {
      const result = validatePersonalStep({ ...validData, nombre: "" })
      expect(result.isValid).toBe(false)
      expect(result.errors.nombre).toBeDefined()
    })

    it("debe detectar email inválido", () => {
      const result = validatePersonalStep({ ...validData, email: "email-invalido" })
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBeDefined()
    })

    it("debe detectar edad fuera de rango", () => {
      const result = validatePersonalStep({ ...validData, edad: 15 })
      expect(result.isValid).toBe(false)
      expect(result.errors.edad).toBeDefined()
    })
  })

  describe("validateFisicoStep", () => {
    const validData = {
      peso: 70,
      altura: 1.75,
      nivelActividad: "moderado",
    }

    it("debe validar datos físicos correctos", () => {
      const result = validateFisicoStep(validData)
      expect(result.isValid).toBe(true)
    })

    it("debe detectar peso inválido", () => {
      const result = validateFisicoStep({ ...validData, peso: 20 })
      expect(result.isValid).toBe(false)
      expect(result.errors.peso).toBeDefined()
    })

    it("debe detectar altura inválida", () => {
      const result = validateFisicoStep({ ...validData, altura: 0.5 })
      expect(result.isValid).toBe(false)
      expect(result.errors.altura).toBeDefined()
    })
  })

  describe("validateObjetivosStep", () => {
    const validData = {
      objetivos: ["perder_peso", "ganar_musculo"],
      diasEntrenamiento: 4,
    }

    it("debe validar objetivos correctos", () => {
      const result = validateObjetivosStep(validData)
      expect(result.isValid).toBe(true)
    })

    it("debe detectar lista de objetivos vacía", () => {
      const result = validateObjetivosStep({ ...validData, objetivos: [] })
      expect(result.isValid).toBe(false)
      expect(result.errors.objetivos).toBeDefined()
    })

    it("debe detectar días de entrenamiento inválidos", () => {
      const result = validateObjetivosStep({ ...validData, diasEntrenamiento: 0 })
      expect(result.isValid).toBe(false)
      expect(result.errors.diasEntrenamiento).toBeDefined()
    })
  })

  describe("validateMedicoStep", () => {
    it("debe validar datos médicos opcionales", () => {
      const result = validateMedicoStep({
        lesiones: "",
        condicionesMedicas: "",
        medicamentos: "",
      })
      expect(result.isValid).toBe(true)
    })

    it("debe aceptar datos médicos proporcionados", () => {
      const result = validateMedicoStep({
        lesiones: "Lesión de rodilla hace 2 años",
        condicionesMedicas: "Hipertensión controlada",
        medicamentos: "Losartán 50mg",
      })
      expect(result.isValid).toBe(true)
    })
  })

  describe("validatePreferenciasStep", () => {
    const validData = {
      preferenciasAlimentarias: ["sin_gluten", "vegetariano"],
    }

    it("debe validar preferencias correctas", () => {
      const result = validatePreferenciasStep(validData)
      expect(result.isValid).toBe(true)
    })

    it("debe aceptar preferencias vacías", () => {
      const result = validatePreferenciasStep({ preferenciasAlimentarias: [] })
      expect(result.isValid).toBe(true)
    })
  })
})
