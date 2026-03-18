import { motion as Motion } from 'framer-motion';
import { Zap, Dumbbell, Activity, Heart, ClipboardCheck, CheckCircle } from 'lucide-react';

const Services = ({ scrollToSection }) => {
    // TODO: Kevin enviará los nombres exactos de los tests desde su software
    const valoracionItems = [
        'Adipometría (medición de composición corporal)',
        'Test de Fuerza',
        'Test de Resistencia',
        'Test de Coordinación',
        'Test de Flexibilidad',
    ];

    const trainingTypes = [
        {
            title: 'Calistenia Pura',
            subtitle: 'Bodyweight Training',
            description: 'Entrenamiento 100% con el peso corporal. Fuerza funcional, control y habilidades gimnásticas. Ideal para quienes quieren dominar su cuerpo.',
            icon: <Activity size={40} />,
            color: 'from-brand-purple-600 to-brand-purple-400',
        },
        {
            title: 'Calistenia Híbrida',
            subtitle: 'Lo Mejor de Ambos Mundos',
            description: 'Combina bodyweight + pesas y máquinas. Lo mejor de ambos mundos para máxima versatilidad y resultados.',
            icon: <Dumbbell size={40} />,
            color: 'from-brand-neon-green-neon to-brand-neon-green-500',
        },
        {
            title: 'Gym Tradicional',
            subtitle: 'Hipertrofia & Estética',
            description: 'Enfocado en hipertrofia y resultados estéticos visibles. Ideal para público joven con objetivos de definición muscular, énfasis en tren inferior, glúteos y composición corporal.',
            icon: <Zap size={40} />,
            color: 'from-brand-purple-600 to-brand-purple-400',
        },
    ];

    const packages = [
        {
            name: 'BÁSICO',
            duration: '3 meses',
            price: '$300.000',
            period: 'COP/mes',
            note: 'Tarifa fija. Puede variar según zona geográfica',
            features: [
                'Valoración inicial completa (adipometría + 4 tests)',
                'Programación mensual personalizada',
                'Asesoría nutricional básica incluida',
            ],
            highlighted: false,
        },
        {
            name: 'AVANZADO',
            duration: '6 meses',
            price: '$250.000',
            period: 'COP/mes (sin nutrición)',
            note: 'Con nutrición avanzada: $350.000 COP/mes',
            features: [
                'Programación mensual de entrenamiento',
                'Valoración cada 2 meses',
                'Asesoría nutricional avanzada (opcional +$100.000)',
                'Seguimiento continuo',
            ],
            highlighted: true,
        },
        {
            name: 'AVANZADO + NUTRICIÓN',
            duration: '6 meses',
            price: '$350.000',
            period: 'COP/mes',
            note: 'Incluye plan nutricional avanzado completo',
            features: [
                'Todo lo del plan Avanzado',
                'Asesoría nutricional avanzada incluida',
                'Plan alimenticio personalizado',
                'Ajustes nutricionales mensuales',
            ],
            highlighted: false,
        },
    ];

    return (
        <section id="services" className="py-24 px-4 bg-gradient-to-b from-brand-silver-900 to-brand-silver-800 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-silver-900 via-brand-silver-800 to-brand-silver-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(75,0,130,0.15),transparent_40%)]" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 via-brand-neon-green-neon to-brand-silver-200">
                            Servicios
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-purple-500 via-brand-neon-green-neon to-brand-purple-500 mx-auto rounded-full" />
                </Motion.div>

                {/* BLOQUE A — Valoración Inicial */}
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-neon-green-neon/30 rounded-2xl p-8"
                >
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-500 rounded-lg shadow-lg shadow-brand-neon-green-neon/30">
                            <ClipboardCheck size={28} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 to-brand-silver-200">
                                Valoración Inicial
                            </h3>
                            <p className="text-brand-neon-green-neon text-sm font-medium">Incluida en todos los paquetes</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-5 gap-4">
                        {valoracionItems.map((item, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center space-x-2 bg-brand-silver-800/50 rounded-lg p-3 border border-brand-purple-600/20"
                            >
                                <CheckCircle size={16} className="text-brand-neon-green-neon flex-shrink-0" />
                                <span className="text-brand-silver-300 text-sm">{item}</span>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>

                {/* BLOQUE B — Tipos de Entrenamiento Personalizado */}
                <Motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-4"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 to-brand-silver-200">
                        Tipos de Entrenamiento Personalizado
                    </h3>
                </Motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {trainingTypes.map((training, index) => (
                        <Motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -10 }}
                            className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl p-8 relative overflow-hidden group hover:border-brand-neon-green-neon/50 transition-all"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-neon-green-neon/10 rounded-bl-full" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-purple-500/10 rounded-tr-full" />

                            <div className="relative z-10">
                                <div className={`w-16 h-16 bg-gradient-to-r ${training.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    {training.icon}
                                </div>

                                <h4 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 to-brand-silver-200">
                                    {training.title}
                                </h4>
                                <p className="text-brand-neon-green-neon text-sm font-medium mb-4">{training.subtitle}</p>

                                <p className="text-brand-silver-300 text-lg leading-relaxed">
                                    {training.description}
                                </p>
                            </div>
                        </Motion.div>
                    ))}
                </div>

                {/* BLOQUE C — Paquetes y Precios */}
                <Motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-4"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 to-brand-silver-200">
                        Paquetes y Precios
                    </h3>
                </Motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {packages.map((pkg, index) => (
                        <Motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -5 }}
                            className={`relative rounded-2xl p-8 transition-all ${
                                pkg.highlighted
                                    ? 'bg-gradient-to-br from-brand-purple-900/50 to-brand-silver-900/50 border-2 border-brand-neon-green-neon/50 shadow-lg shadow-brand-neon-green-neon/10'
                                    : 'bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 border border-brand-purple-600/30 hover:border-brand-neon-green-neon/50'
                            }`}
                        >
                            {pkg.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400 rounded-full text-brand-silver-900 text-xs font-bold">
                                    MÁS POPULAR
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h4 className="text-xl font-bold text-brand-silver-50 mb-2">{pkg.name}</h4>
                                <p className="text-brand-silver-400 text-sm">{pkg.duration}</p>
                                <div className="mt-4">
                                    <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400">
                                        {pkg.price}
                                    </span>
                                    <span className="text-brand-silver-400 text-sm block mt-1">{pkg.period}</span>
                                </div>
                                {pkg.note && (
                                    <p className="text-brand-silver-500 text-xs mt-2 italic">{pkg.note}</p>
                                )}
                            </div>

                            <div className="border-t border-brand-purple-600/30 pt-6 space-y-3">
                                {pkg.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-start space-x-3">
                                        <CheckCircle size={16} className="text-brand-neon-green-neon flex-shrink-0 mt-0.5" />
                                        <span className="text-brand-silver-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Motion.button
                                onClick={() => scrollToSection('anamnesis')}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`w-full mt-6 py-3 rounded-xl font-bold text-sm transition-all ${
                                    pkg.highlighted
                                        ? 'bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400 text-brand-silver-900 shadow-lg shadow-brand-neon-green-neon/30'
                                        : 'bg-brand-silver-800/50 border border-brand-purple-600/30 text-brand-silver-200 hover:bg-brand-silver-700/50 hover:border-brand-neon-green-neon/50'
                                }`}
                            >
                                Elegir Plan
                            </Motion.button>
                        </Motion.div>
                    ))}
                </div>

                {/* Servicio Adicional */}
                <Motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-br from-brand-silver-800/30 to-brand-silver-900/30 backdrop-blur-sm border border-brand-purple-600/20 rounded-xl p-6 mb-6"
                >
                    <div className="flex items-center justify-center space-x-3 mb-2">
                        <Heart size={20} className="text-brand-neon-green-neon" />
                        <h4 className="text-lg font-bold text-brand-silver-50">Servicio Adicional</h4>
                    </div>
                    <p className="text-brand-silver-300">
                        Asesoría nutricional por hora:{' '}
                        <span className="text-brand-neon-green-neon font-bold text-xl">$25.000 COP</span>
                    </p>
                </Motion.div>

                {/* Nota al pie de precios */}
                <p className="text-center text-brand-silver-500 text-sm italic max-w-2xl mx-auto">
                    *Tarifas pueden variar según ubicación. Contáctanos para confirmar tu precio según tu zona.
                </p>
            </div>
        </section>
    );
};

export default Services;
