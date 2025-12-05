import { motion } from 'framer-motion';
import { Zap, MessageCircle, ArrowDown } from 'lucide-react';

const Hero = ({ scrollToSection, handleWhatsAppClick }) => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent transform rotate-45" />
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-full border border-purple-500/30 mb-6">
                        <span className="text-purple-300 font-medium">Tecnología y Fuerza</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Todo es mental
                        </span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-300 mb-8">
                        Capacidad. Valor. Voluntad.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <motion.button
                            onClick={() => scrollToSection('anamnesis')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                        >
                            <Zap size={20} />
                            <span>Comenzar Anamnesis</span>
                        </motion.button>
                        <motion.button
                            onClick={handleWhatsAppClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full font-bold text-lg flex items-center justify-center space-x-2 border border-purple-500/30 hover:bg-gray-600 transition-all"
                        >
                            <MessageCircle size={20} />
                            <span>WhatsApp</span>
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16"
                >
                    <div className="inline-flex items-center space-x-2 text-purple-300 font-medium cursor-pointer hover:text-purple-200 transition-colors">
                        <span>Explorar</span>
                        <ArrowDown size={18} className="animate-bounce" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
