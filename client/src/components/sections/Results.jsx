import { motion as Motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';

const Results = ({ handleWhatsAppClick }) => {
    return (
        <section id="results" className="py-24 px-4 relative overflow-hidden bg-[#0d1117]">
            {/* 60% Silver Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117]" />
            {/* 30% Purple Accents */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-900/10 to-transparent" />
            {/* 10% Neon Green Accents */}
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto relative">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                            Resultados Reales
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-purple-500 via-brand-neon-green-neon to-brand-purple-500 mx-auto rounded-full" />
                </Motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((result, index) => (
                        <Motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl overflow-hidden hover:border-brand-neon-green-neon/50 transition-all"
                        >
                            <div className="h-64 bg-gradient-to-br from-brand-silver-900 to-brand-silver-800 flex items-center justify-center">
                                <div className="text-center p-4">
                                    <div className="w-32 h-32 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-brand-purple-500/30">
                                        <div className="w-28 h-28 bg-brand-silver-800 rounded-full border-2 border-brand-neon-green-neon flex items-center justify-center">
                                            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-neon-green-neon">{index + 1}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-purple-600">
                                        Cliente {index + 1}
                                    </h3>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={18} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-brand-purple-400 font-medium mb-2">Perdió 15kg en 4 meses</p>

                                <p className="text-brand-silver-300 mb-4">
                                    "El seguimiento constante y la adaptación de mi plan hizo la diferencia. Kevin entendió mis limitaciones y me guió paso a paso."
                                </p>

                                <div className="flex items-center space-x-2 text-sm text-brand-silver-400">
                                    <span>Antes</span>
                                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 via-brand-purple-500 to-brand-neon-green-neon rounded-full"></div>
                                    <span>Después</span>
                                </div>
                            </div>
                        </Motion.div>
                    ))}
                </div>

                <Motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-xl text-brand-silver-300 mb-8 max-w-3xl mx-auto">
                        Cada transformación comienza con una decisión mental. Nuestro compromiso es guiarte en cada paso del camino con tecnología y disciplina.
                    </p>
                    <Motion.button
                        onClick={handleWhatsAppClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-full font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-brand-purple-500/50 transition-all mx-auto"
                    >
                        <MessageCircle size={22} />
                        <span>Inicia tu transformación</span>
                    </Motion.button>
                </Motion.div>
            </div>
        </section>
    );
};

export default Results;
