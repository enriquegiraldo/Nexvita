import { motion as Motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-4 relative overflow-hidden bg-brand-silver-900">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-silver-900 via-brand-silver-800 to-brand-silver-900" />
            {/* Navy Accents */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-900/10 to-transparent" />
            {/* Amber Accents */}
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto relative">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 via-brand-neon-green-neon to-brand-silver-200">
                            Contacto
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-purple-500 via-brand-neon-green-neon to-brand-purple-500 mx-auto rounded-full" />
                </Motion.div>

                <div className="max-w-4xl mx-auto">
                    <Motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl text-brand-silver-300 mb-12 text-center"
                    >
                        ¿Listo para comenzar tu transformación? Utiliza el botón de WhatsApp flotante para comunicarte directamente con Kevin, o consulta nuestra información de contacto.
                    </Motion.p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <Phone size={28} />,
                                title: "Teléfono",
                                info: "+57 310 755 3317",
                                detail: "Llamadas y WhatsApp"
                            },
                            {
                                icon: <Mail size={28} />,
                                title: "Email",
                                info: "contacto@fitdrolean.com",
                                detail: "Respuesta en 24h"
                            },
                            {
                                icon: <Clock size={28} />,
                                title: "Horarios",
                                info: "Lun - Sáb: 6:00 AM - 9:00 PM",
                                detail: "Hora Colombia (GMT-5)"
                            },
                            {
                                icon: <MapPin size={28} />,
                                title: "Ubicación",
                                info: "Colombia",
                                detail: "Entrenamiento presencial y online"
                            },
                        ].map((item, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl p-6 hover:border-brand-neon-green-neon/50 transition-all"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-lg shadow-lg shadow-brand-purple-500/30">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-brand-silver-50 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-brand-neon-green-neon font-medium">
                                            {item.info}
                                        </p>
                                        <p className="text-brand-silver-400 text-sm mt-1">
                                            {item.detail}
                                        </p>
                                    </div>
                                </div>
                            </Motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
