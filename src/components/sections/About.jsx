import { motion } from 'framer-motion';
import { Brain, Target, Zap, Shield, MessageCircle, ChevronRight } from 'lucide-react';

const About = ({ handleWhatsAppClick }) => {
    return (
        <section id="about" className="py-24 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-transparent" />
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Sobre DROLEAN
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Profile Image Placeholder */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl opacity-20 blur-xl" />
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-500/30 rounded-3xl overflow-hidden">
                                <div className="aspect-square flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <div className="w-48 h-48 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <div className="w-40 h-40 bg-gray-800 rounded-full border-2 border-purple-400 flex items-center justify-center">
                                                <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                                    K
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                            Kevin Drolean
                                        </h3>
                                        <p className="text-gray-400 mt-2">Entrenador & Fundador</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 rounded-full mix-blend-screen filter blur-2xl opacity-20" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Transformación tecnológica humana
                        </h3>

                        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                            En DROLEAN fusionamos la disciplina del fitness con la precisión de la tecnología. No somos solo un entrenador, somos tu sistema de transformación personal.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                { icon: <Brain size={24} />, text: "Enfoque mental primero" },
                                { icon: <Target size={24} />, text: "Resultados basados en datos" },
                                { icon: <Zap size={24} />, text: "Metodología de vanguardia" },
                                { icon: <Shield size={24} />, text: "Seguridad y adaptación personal" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className="mt-1 p-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg">
                                        {item.icon}
                                    </div>
                                    <p className="text-gray-300 text-lg">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            onClick={handleWhatsAppClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                        >
                            <MessageCircle size={20} />
                            <span>Conversemos por WhatsApp</span>
                            <ChevronRight size={18} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
