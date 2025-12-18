import { motion as Motion } from 'framer-motion';
import { Zap, MessageCircle, ArrowDown } from 'lucide-react';

const Hero = ({ scrollToSection, handleWhatsAppClick }) => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                {/* Background Image Placeholder - Replace with actual image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                    }}
                >
                    {/* Dark Overlay - 60% Silver (dominant) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/95 via-[#0d1117]/90 to-[#0d1117]/95" />
                    
                    {/* Purple Accent Overlay - 30% Purple */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/20 via-transparent to-brand-purple-800/10" />
                    
                    {/* Neon Green Accent - 10% Neon Green */}
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-neon-green-neon/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse" />
                    <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-brand-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-brand-purple-600/30 to-brand-neon-green-neon/20 rounded-full border border-brand-purple-400/40 mb-8 backdrop-blur-sm">
                        <span className="text-brand-purple-300 font-medium flex items-center space-x-2">
                            <Zap size={16} className="text-brand-neon-green-neon" />
                            <span>Tecnología y Fuerza</span>
                        </span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                            Transforma tu cuerpo,
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-neon-green-neon via-brand-purple-400 to-brand-neon-green-neon mt-2">
                            transforma tu mente
                        </span>
                    </h1>
                    
                    <p className="text-2xl md:text-4xl text-brand-silver-200 mb-4 font-light">
                        Capacidad. Valor. Voluntad.
                    </p>
                    
                    <p className="text-lg md:text-xl text-brand-silver-400 mb-10 max-w-2xl mx-auto">
                        Tu sistema de entrenamiento personalizado que fusiona la disciplina del fitness con la precisión de la tecnología.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Motion.button
                            onClick={() => scrollToSection('anamnesis')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-full font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-brand-purple-500/50 transition-all"
                        >
                            <Zap size={20} />
                            <span>Comenzar Anamnesis</span>
                        </Motion.button>
                        <Motion.button
                            onClick={handleWhatsAppClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-brand-silver-800 to-brand-silver-700 rounded-full font-bold text-lg flex items-center justify-center space-x-2 border border-brand-neon-green-neon/30 hover:border-brand-neon-green-neon/60 hover:bg-brand-silver-700 transition-all backdrop-blur-sm"
                        >
                            <MessageCircle size={20} className="text-brand-neon-green-neon" />
                            <span>WhatsApp</span>
                        </Motion.button>
                    </div>
                </Motion.div>

                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16"
                >
                    <button
                        onClick={() => scrollToSection('about')}
                        className="inline-flex items-center space-x-2 text-brand-purple-300 font-medium cursor-pointer hover:text-brand-neon-green-neon transition-colors group"
                    >
                        <span>Explorar</span>
                        <ArrowDown size={18} className="animate-bounce group-hover:text-brand-neon-green-neon" />
                    </button>
                </Motion.div>
            </div>
        </section>
    );
};

export default Hero;
