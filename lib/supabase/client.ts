// Cliente de Supabase con patrón singleton para evitar múltiples instancias
// Sigue las mejores prácticas de @supabase/ssr para Next.js

import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  // Verificar si las variables de entorno están configuradas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase env vars no configuradas. Usando almacenamiento local.")
    return null
  }

  // Patrón singleton: crear cliente solo una vez
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseClient
}

// Hook para usar en componentes
export function useSupabase() {
  return getSupabaseClient()
}
