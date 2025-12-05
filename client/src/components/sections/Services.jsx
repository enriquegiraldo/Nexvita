import { motion } from 'framer-motion';
import { Smartphone, Target, Heart, MessageCircle } from 'lucide-react';

const Services = ({ handleWhatsAppClick }) => {
    return (
        <section id="services" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(188,19,254,0.1),transparent_40%)]" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Nuestros Servicios
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Anamnesis Digital",
                            description: "Evaluación completa de salud, lesiones previas, objetivos y estilo de vida para crear tu plan personalizado.",
                            icon: <Smartphone size={40} />,
                            price: "Incluido en todos los planes"
                        },
                        {
                            title: "Prescripción de Ejercicio",
                            description: "Rutinas personalizadas adaptadas a tus capacidades, objetivos y disponibilidad, con seguimiento constante.",
                            icon: <Target size={40} />,
                            price: "Desde $499/mes"
                        },
                        {
                            title: "Programación Nutricional",
                            description: "Plan de alimentación personalizado basado en tus preferencias, necesidades y estilo de vida.",
                            icon: <Heart size={40} />,
                            price: "Desde $299/mes"
                        }
                    ].map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -10 }}
                            className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-purple-900/50 rounded-2xl p-8 relative overflow-hidden group"
                        >
                            {/* Decorative corner elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-tr-full" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                    {service.title}
                                </h3>

                                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mt-6 pt-4 border-t border-purple-900/50">
                                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                        {service.price}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <motion.button
                        onClick={handleWhatsAppClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all mx-auto"
                    >
                        <MessageCircle size={22} />
                        <span>Comprar Plan por WhatsApp</span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
