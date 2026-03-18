import { motion as Motion } from 'framer-motion';
import { Zap, ArrowDown, Eye } from 'lucide-react';

const Hero = ({ scrollToSection }) => {
    const handleWhatsAppClick = () => {
        const message = "Hola Kevin, me gustaría empezar mi transformación. ¡Quiero más información!";
        const whatsappUrl = `https://wa.me/573107553317?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

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
                    
                    {/* Purple Accent Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/20 via-transparent to-brand-purple-800/10" />
                    
                    {/* Neon Accent */}
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
                            <span>Calistenia · Gym · Transformación</span>
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight">
                        <span className="block text-white drop-shadow-2xl">
                            TRANSFORMA TU CUERPO
                        </span>
                        <span className="block text-3xl md:text-5xl lg:text-6xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-neon-green-neon via-brand-purple-300 to-brand-neon-green-neon">
                            con Kevin Leandro
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-brand-silver-200 mb-4 font-light max-w-3xl mx-auto">
                        Especialista en <span className="text-brand-neon-green-neon font-semibold">Calistenia Pura</span>,{' '}
                        <span className="text-brand-neon-green-neon font-semibold">Calistenia Híbrida</span> y{' '}
                        <span className="text-brand-neon-green-neon font-semibold">Gym Personalizado</span>
                    </p>
                    
                    <p className="text-lg md:text-xl text-brand-silver-400 mb-10 max-w-2xl mx-auto">
                        Transformo tu cuerpo con un plan personalizado basado en datos, disciplina y la metodología que mejor se adapte a ti.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Motion.button
                            onClick={handleWhatsAppClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400 rounded-full font-bold text-lg text-brand-silver-900 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-brand-neon-green-neon/50 transition-all"
                        >
                            <Zap size={22} strokeWidth={2.5} />
                            <span>¡Quiero empezar!</span>
                        </Motion.button>

                        <Motion.button
                            onClick={() => scrollToSection('results')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border-2 border-brand-purple-500/50 rounded-full font-bold text-lg text-brand-silver-200 flex items-center justify-center space-x-2 hover:border-brand-neon-green-neon/70 hover:text-brand-neon-green-neon transition-all backdrop-blur-sm"
                        >
                            <Eye size={22} />
                            <span>Ver resultados</span>
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
                        <span>Mi Historia</span>
                        <ArrowDown size={18} className="animate-bounce group-hover:text-brand-neon-green-neon" />
                    </button>
                </Motion.div>
            </div>
        </section>
    );
};

export default Hero;
