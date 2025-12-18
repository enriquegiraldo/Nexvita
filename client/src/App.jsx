import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Results from './components/sections/Results';
import Anamnesis from './components/sections/Anamnesis';
import Contact from './components/sections/Contact';
import WhatsAppButton from './components/ui/WhatsAppButton';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

  // WhatsApp click handler with pre-filled message
  const handleWhatsAppClick = () => {
    const message = "Hola fitdrolean, me gustaría información sobre tus planes de entrenamiento.";
    const whatsappUrl = `https://wa.me/573107553317?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'results', 'anamnesis', 'contact'];
      let current = 'hero';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            break;
          }
        }
      }

      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans overflow-x-hidden">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        handleWhatsAppClick={handleWhatsAppClick}
      />

      <Hero
        scrollToSection={scrollToSection}
        handleWhatsAppClick={handleWhatsAppClick}
      />

      <About handleWhatsAppClick={handleWhatsAppClick} />

      <Services handleWhatsAppClick={handleWhatsAppClick} />

      <Results handleWhatsAppClick={handleWhatsAppClick} />

      <Anamnesis handleWhatsAppClick={handleWhatsAppClick} />

      <Contact handleWhatsAppClick={handleWhatsAppClick} />

      <WhatsAppButton handleWhatsAppClick={handleWhatsAppClick} />

      <Footer handleWhatsAppClick={handleWhatsAppClick} />
    </div>
  );
};

export default App;
