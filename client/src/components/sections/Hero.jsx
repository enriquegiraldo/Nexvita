import { motion as Motion } from 'framer-motion';
import { Zap, ArrowDown } from 'lucide-react';

const Hero = ({ scrollToSection }) => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://697ad972c4feaabd2d0fcca3.imgix.net/484318108_29416627614652310_3544601152373214830_n.jpg?w=720&h=1600&ar=720%3A1600")',
                    }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-silver-900/95 via-brand-silver-900/90 to-brand-silver-900/95" />
                    
                    {/* Navy Accent Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/20 via-transparent to-brand-purple-800/10" />
                    
                    {/* Amber Accent */}
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-neon-green-neon/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse" />
                    <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-brand-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-10"
                >
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-brand-purple-600/30 to-brand-neon-green-neon/20 rounded-full border border-brand-purple-400/40 mb-8 backdrop-blur-sm">
                        <span className="text-brand-purple-300 font-medium flex items-center space-x-2">
                            <Zap size={16} className="text-brand-neon-green-neon" />
                            <span>Tecnología y Fuerza</span>
                        </span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 via-brand-neon-green-neon to-brand-silver-200">
                            Transforma tu cuerpo,
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-neon-green-neon via-brand-silver-50 to-brand-neon-green-neon mt-2">
                            transforma tu mente
                        </span>
                    </h1>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight text-white drop-shadow-2xl">
                        EL EJERCICIO ES LA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400">
                            VIDA QUE LATE
                        </span> <br />
                        DENTRO DE TI
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
                            className="px-8 py-4 bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400 rounded-full font-bold text-lg text-brand-silver-900 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-brand-neon-green-neon/50 transition-all"
                        >
                            <Zap size={22} strokeWidth={2.5} />
                            <span>COMENZAR AHORA</span>
                        </Motion.button>
                    </div>
                </Motion.div>

                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-12"
                >
                    <button
                        onClick={() => scrollToSection('about')}
                        className="inline-flex items-center space-x-2 text-brand-silver-300 font-medium cursor-pointer hover:text-brand-neon-green-neon transition-colors group"
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
