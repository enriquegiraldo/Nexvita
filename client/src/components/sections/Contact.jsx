import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const Contact = ({ handleWhatsAppClick }) => {
    return (
        <section id="contact" className="py-24 px-4 relative overflow-hidden">
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
                            Contacto
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
                </motion.div>

                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-300 mb-8"
                    >
                        ¿Listo para comenzar tu transformación? Comunícate directamente con Kevin vía WhatsApp para personalizar tu plan de entrenamiento.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-purple-900/50 rounded-2xl p-8 mx-auto max-w-md"
                    >
                        <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MessageCircle size={32} />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            WhatsApp Directo
                        </h3>

                        <p className="text-gray-300 mb-6">
                            Comunícate directamente con Kevin para resolver tus dudas y comenzar tu transformación.
                        </p>

                        <motion.button
                            onClick={handleWhatsAppClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                        >
                            <MessageCircle size={22} />
                            <span>Enviar mensaje por WhatsApp</span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
