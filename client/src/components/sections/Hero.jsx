import { motion as Motion } from 'framer-motion';
import { Zap, MessageCircle, ArrowDown } from 'lucide-react';
// import heroBg from '../../assets/hero_background.png'; // Assuming image is placed here. 
// For now, if the image isn't moved yet, I will use a relative path or a placeholder if the tool hasn't moved it. 
// The system tool 'generate_image' saves to artifacts. I need to move it to src/assets to import it properly.
// I will assume for this step that I will move it in the next tool call, or reference it from artifacts if local dev allows.
// Standard practice: Import from assets. I'll use a variable for now and ensure file is there.

const Hero = ({ scrollToSection, handleWhatsAppClick }) => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero_background.png" /* Assuming I'll move it to public or src/assets and import */
                    alt="Fitness Lifestyle"
                    className="w-full h-full object-cover"
                />
                {/* 60% Dominant Color Overlay */}
                <div className="absolute inset-0 bg-fit-purple/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-fit-purple-dark/50 to-fit-purple-dark/90" />
            </div>

            {/* Grid Overlay for Texture */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#39FF14_1px,transparent_1px),linear-gradient(to_bottom,#39FF14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-10"
                >
                    <div className="inline-block px-6 py-2 bg-fit-purple-dark/50 rounded-full border border-fit-neon/30 backdrop-blur-md mb-8">
                        <span className="text-fit-neon font-bold tracking-wider uppercase text-sm">
                            FitDrolean
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight text-white drop-shadow-2xl">
                        EL EJERCICIO ES LA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fit-neon to-emerald-400">
                            VIDA QUE LATE
                        </span> <br />
                        DENTRO DE TI
                    </h1>

                    <p className="text-xl md:text-2xl text-fit-gray mb-10 max-w-3xl mx-auto font-light">
                        Descubre tu equilibrio, potencia tu mente y transforma tu realidad.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Motion.button
                            onClick={() => scrollToSection('anamnesis')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-fit-neon text-fit-purple-dark rounded-full font-black text-lg flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-all"
                        >
                            <Zap size={22} strokeWidth={2.5} />
                            <span>COMENZAR AHORA</span>
                        </Motion.button>

                        <Motion.button
                            onClick={handleWhatsAppClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-fit-gray text-white rounded-full font-bold text-lg flex items-center justify-center space-x-2 hover:bg-white/10 transition-all"
                        >
                            <MessageCircle size={22} />
                            <span>WhatsApp</span>
                        </Motion.button>
                    </div>
                </Motion.div>

                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-12"
                >
                    <div className="inline-flex items-center gap-3 text-fit-gray/80 text-sm font-medium animate-pulse">
                        <span>DESCUBRE MÁS</span>
                        <ArrowDown size={16} />
                    </div>
                </Motion.div>
            </div>
        </section>
    );
};

export default Hero;
