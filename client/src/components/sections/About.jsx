import { motion as Motion } from 'framer-motion';
import { Brain, Target, Zap, Shield, MessageCircle, ChevronRight, Eye, Rocket } from 'lucide-react';

const About = ({ handleWhatsAppClick }) => {
    return (
        <section id="about" className="py-24 px-4 relative overflow-hidden bg-[#0d1117]">
            {/* 60% Silver Background - Dominant */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117]" />
            
            {/* 30% Purple Accents */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/10 via-transparent to-brand-purple-800/5" />
            
            {/* 10% Neon Green Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />
            
            <div className="max-w-7xl mx-auto relative">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                            Sobre fitdrolean
                        </span>
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-brand-purple-500 via-brand-neon-green-neon to-brand-purple-500 mx-auto rounded-full" />
                </Motion.div>

                {/* Vision & Mission Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Vision Card */}
                    <Motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl p-8 hover:border-brand-neon-green-neon/50 transition-all"
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-lg">
                                <Eye size={28} className="text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-purple-600">
                                Visión
                            </h3>
                        </div>
                        <p className="text-brand-silver-300 text-lg leading-relaxed">
                            Ser la plataforma líder en transformación física y mental, donde la tecnología y el entrenamiento personalizado se fusionan para crear resultados extraordinarios. Visualizamos un futuro donde cada persona pueda alcanzar su máximo potencial a través de metodologías innovadoras y un enfoque integral.
                        </p>
                    </Motion.div>

                    {/* Mission Card */}
                    <Motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl p-8 hover:border-brand-neon-green-neon/50 transition-all"
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-500 rounded-lg">
                                <Rocket size={28} className="text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-500">
                                Misión
                            </h3>
                        </div>
                        <p className="text-brand-silver-300 text-lg leading-relaxed">
                            Proporcionar un sistema de entrenamiento personalizado que combine la disciplina del fitness con la precisión de la tecnología. Nuestra misión es empoderar a cada individuo para que descubra su capacidad, valore su progreso y desarrolle la voluntad necesaria para transformar su cuerpo y mente.
                        </p>
                    </Motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Profile Image Placeholder */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple-600 to-brand-neon-green-neon rounded-3xl opacity-20 blur-xl" />
                            <div className="relative bg-gradient-to-br from-brand-silver-900 to-brand-silver-800 border-2 border-brand-purple-500/30 rounded-3xl overflow-hidden">
                                <div className="aspect-square flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <div className="w-48 h-48 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-purple-500/30">
                                            <div className="w-40 h-40 bg-brand-silver-800 rounded-full border-2 border-brand-neon-green-neon flex items-center justify-center">
                                                <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-neon-green-neon">
                                                    K
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-neon-green-neon">
                                            Kevin Drolean
                                        </h3>
                                        <p className="text-brand-silver-400 mt-2">Entrenador & Fundador</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements - 10% Neon Green */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-neon-green-neon/20 rounded-full mix-blend-screen filter blur-2xl opacity-40" />
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                            Transformación tecnológica humana
                        </h3>

                        <p className="text-brand-silver-300 mb-6 text-lg leading-relaxed">
                            En <span className="text-brand-purple-400 font-semibold">fitdrolean</span> fusionamos la disciplina del fitness con la precisión de la tecnología. No somos solo un entrenador, somos tu sistema de transformación personal que te guía desde la anamnesis inicial hasta alcanzar tus objetivos más ambiciosos.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                { icon: <Brain size={24} />, text: "Enfoque mental primero", color: "from-brand-purple-600 to-brand-purple-400" },
                                { icon: <Target size={24} />, text: "Resultados basados en datos", color: "from-brand-purple-600 to-brand-purple-400" },
                                { icon: <Zap size={24} />, text: "Metodología de vanguardia", color: "from-brand-neon-green-neon to-brand-neon-green-500" },
                                { icon: <Shield size={24} />, text: "Seguridad y adaptación personal", color: "from-brand-purple-600 to-brand-purple-400" }
                            ].map((item, index) => (
                                <Motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className={`mt-1 p-2 bg-gradient-to-r ${item.color} rounded-lg shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <p className="text-brand-silver-300 text-lg">{item.text}</p>
                                </Motion.div>
                            ))}
                        </div>

                        <Motion.button
                            onClick={handleWhatsAppClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-6 py-3 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg hover:shadow-brand-purple-500/50 transition-all"
                        >
                            <MessageCircle size={20} />
                            <span>Conversemos por WhatsApp</span>
                            <ChevronRight size={18} />
                        </Motion.button>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
