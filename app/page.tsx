import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { PWARegister } from "@/components/pwa-register"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <PWARegister />
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      <PWAInstallPrompt />
    </main>
  )
}
