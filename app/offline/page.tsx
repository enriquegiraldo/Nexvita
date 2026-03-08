import Link from "next/link"
import { WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Sin conexión | Drolean",
  description: "No hay conexión a internet",
}

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full bg-card border-border text-center">
        <CardContent className="pt-12 pb-8">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Sin conexión</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            No hay conexión a internet. Verifica tu conexión y vuelve a intentarlo.
          </p>

          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
