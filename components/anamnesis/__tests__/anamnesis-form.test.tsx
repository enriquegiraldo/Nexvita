import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AnamnesisForm } from "../anamnesis-form"
import jest from "jest" // Declare the jest variable

// Mock de Framer Motion para evitar problemas en tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe("AnamnesisForm - Pruebas de Componente", () => {
  it("debe renderizar el primer paso (Datos Personales)", () => {
    render(<AnamnesisForm />)

    expect(screen.getByText("Datos Personales")).toBeInTheDocument()
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it("debe avanzar al siguiente paso cuando los datos son válidos", async () => {
    const user = userEvent.setup()
    render(<AnamnesisForm />)

    // Llenar datos personales
    await user.type(screen.getByLabelText(/nombre completo/i), "Juan Pérez")
    await user.type(screen.getByLabelText(/email/i), "juan@ejemplo.com")
    await user.type(screen.getByLabelText(/teléfono/i), "+5491112345678")
    await user.type(screen.getByLabelText(/edad/i), "30")

    // Seleccionar género
    const generoSelect = screen.getByLabelText(/género/i)
    await user.selectOptions(generoSelect, "masculino")

    // Click en Siguiente
    const nextButton = screen.getByRole("button", { name: /siguiente/i })
    await user.click(nextButton)

    // Verificar que avanzó al paso 2
    await waitFor(() => {
      expect(screen.getByText("Datos Físicos")).toBeInTheDocument()
    })
  })

  it("debe mostrar errores de validación", async () => {
    const user = userEvent.setup()
    render(<AnamnesisForm />)

    // Intentar avanzar sin llenar datos
    const nextButton = screen.getByRole("button", { name: /siguiente/i })
    await user.click(nextButton)

    // Verificar que se muestran errores
    await waitFor(() => {
      expect(screen.getByText(/nombre es requerido/i)).toBeInTheDocument()
    })
  })

  it("debe permitir retroceder al paso anterior", async () => {
    const user = userEvent.setup()
    render(<AnamnesisForm />)

    // Llenar y avanzar al paso 2
    await user.type(screen.getByLabelText(/nombre completo/i), "Juan Pérez")
    await user.type(screen.getByLabelText(/email/i), "juan@ejemplo.com")
    await user.type(screen.getByLabelText(/teléfono/i), "+5491112345678")
    await user.type(screen.getByLabelText(/edad/i), "30")

    const generoSelect = screen.getByLabelText(/género/i)
    await user.selectOptions(generoSelect, "masculino")

    const nextButton = screen.getByRole("button", { name: /siguiente/i })
    await user.click(nextButton)

    // Click en Anterior
    const backButton = screen.getByRole("button", { name: /anterior/i })
    await user.click(backButton)

    // Verificar que volvió al paso 1
    await waitFor(() => {
      expect(screen.getByText("Datos Personales")).toBeInTheDocument()
    })
  })

  it("debe deshabilitar el botón Anterior en el primer paso", () => {
    render(<AnamnesisForm />)

    const backButton = screen.getByRole("button", { name: /anterior/i })
    expect(backButton).toBeDisabled()
  })
})
