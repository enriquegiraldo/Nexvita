import { motion as Motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = ({ handleWhatsAppClick }) => {
    return (
        <section id="contact" className="py-24 px-4 relative overflow-hidden bg-[#0d1117]">
            {/* 60% Silver Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117]" />
            {/* 30% Purple Accents */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-900/10 to-transparent" />
            {/* 10% Neon Green Accents */}
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto relative">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                            Contacto
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-purple-500 via-brand-neon-green-neon to-brand-purple-500 mx-auto rounded-full" />
                </Motion.div>

                <div className="max-w-4xl mx-auto text-center">
                    <Motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl text-brand-silver-300 mb-8"
                    >
                        ¿Listo para comenzar tu transformación? Comunícate directamente con Kevin vía WhatsApp para personalizar tu plan de entrenamiento.
                    </Motion.p>

                    <Motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl p-8 mx-auto max-w-md hover:border-brand-neon-green-neon/50 transition-all"
                    >
                        <div className="w-24 h-24 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-purple-500/30">
                            <FaWhatsapp size={32} />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-purple-600">
                            WhatsApp Directo
                        </h3>

                        <p className="text-brand-silver-300 mb-6">
                            Comunícate directamente con Kevin para resolver tus dudas y comenzar tu transformación.
                        </p>

                        <Motion.button
                            onClick={handleWhatsAppClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-8 py-4 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-brand-purple-500/50 transition-all"
                        >
                            <FaWhatsapp size={22} />
                            <span>Enviar mensaje por WhatsApp</span>
                        </Motion.button>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
