import { AnamnesisForm } from "@/components/anamnesis/anamnesis-form"
import { Header } from "@/components/header"

export default function AnamnesisPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Anamnesis <span className="text-primary">Interactiva</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-pretty">
              Completa este formulario para que podamos diseñar un plan personalizado para ti.
            </p>
          </div>
          <AnamnesisForm />
        </div>
      </div>
    </main>
  )
}
