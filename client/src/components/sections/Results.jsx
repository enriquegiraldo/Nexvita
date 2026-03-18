import { motion as Motion } from 'framer-motion';
import { Star, Zap, Play, Camera, MessageSquareQuote, User } from 'lucide-react';

const Results = ({ scrollToSection }) => {
    const transformations = [
        {
            name: 'Cliente Transformación 1',
            result: 'Perdió 15kg en 4 meses',
            method: 'Gym Tradicional',
            testimonial: 'Kevin diseñó un plan que se adaptaba a mi vida. Los resultados hablan por sí solos.',
        },
        {
            name: 'Cliente Transformación 2',
            result: 'Ganó 8kg de masa muscular',
            method: 'Calistenia Híbrida',
            testimonial: 'Nunca pensé que con calistenia podría ganar tanta fuerza. El enfoque híbrido fue la clave.',
        },
        {
            name: 'Cliente Transformación 3',
            result: 'Dominó muscle-up en 3 meses',
            method: 'Calistenia Pura',
            testimonial: 'De no poder hacer un pull-up a dominar el muscle-up. Kevin sabe cómo llevarte al límite.',
        },
    ];

    const testimonials = [
        {
            name: 'Carlos M.',
            age: 28,
            text: 'El seguimiento constante y la adaptación de mi plan hizo la diferencia. Kevin entendió mis limitaciones y me guió paso a paso hacia mis objetivos.',
            rating: 5,
        },
        {
            name: 'Andrea P.',
            age: 24,
            text: 'Empecé sin saber nada de calistenia y hoy puedo hacer rutinas que nunca imaginé. El apoyo nutricional fue clave en mi transformación.',
            rating: 5,
        },
        {
            name: 'Miguel R.',
            age: 32,
            text: 'Con el plan híbrido logré el balance perfecto entre fuerza funcional y estética. Mejor inversión en mi salud que he hecho.',
            rating: 5,
        },
    ];

    // TODO: Agregar links de videos reales cuando Kevin los envíe
    const videoPlaceholders = [
        {
            title: 'Transformación Completa — 6 meses',
            description: 'De principiante a atleta: calistenia pura + nutrición',
        },
        {
            title: 'Rutina de Calistenia Híbrida',
            description: 'Entrenamiento real de un día de calistenia + gym',
        },
    ];

    return (
        <section id="results" className="py-24 px-4 relative overflow-hidden bg-brand-silver-900">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-silver-900 via-brand-silver-800 to-brand-silver-900" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-900/10 to-transparent" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />

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
                            Resultados Reales
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-purple-500 via-brand-neon-green-neon to-brand-purple-500 mx-auto rounded-full" />
                    <p className="text-brand-silver-300 mt-6 max-w-2xl mx-auto text-lg">
                        Transformaciones reales de clientes que confiaron en el proceso. Cada resultado es prueba de disciplina, constancia y el plan adecuado.
                    </p>
                </Motion.div>

                {/* Before/After Transformations Grid */}
                <div className="mb-16">
                    <div className="flex items-center space-x-3 mb-8">
                        <Camera size={24} className="text-brand-neon-green-neon" />
                        <h3 className="text-2xl font-bold text-brand-silver-50">Transformaciones Antes / Después</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {transformations.map((item, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -5 }}
                                className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl overflow-hidden hover:border-brand-neon-green-neon/50 transition-all"
                            >
                                {/* Photo Placeholder */}
                                <div className="h-64 bg-gradient-to-br from-brand-silver-900 to-brand-silver-800 flex items-center justify-center relative">
                                    <div className="flex items-center space-x-4">
                                        {/* Before */}
                                        <div className="text-center">
                                            <div className="w-24 h-24 bg-brand-silver-800 border-2 border-red-500/50 rounded-lg flex items-center justify-center">
                                                <span className="text-brand-silver-500 text-xs">ANTES</span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="text-brand-neon-green-neon">
                                            <Zap size={24} />
                                        </div>

                                        {/* After */}
                                        <div className="text-center">
                                            <div className="w-24 h-24 bg-brand-silver-800 border-2 border-brand-neon-green-neon/50 rounded-lg flex items-center justify-center">
                                                <span className="text-brand-silver-500 text-xs">DESPUÉS</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="absolute bottom-2 text-brand-silver-600 text-xs">Foto real próximamente</p>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 to-brand-silver-200">
                                            {item.name}
                                        </h4>
                                    </div>
                                    <p className="text-brand-neon-green-neon font-semibold mb-1">{item.result}</p>
                                    <p className="text-brand-purple-400 text-sm mb-3">Método: {item.method}</p>
                                    <p className="text-brand-silver-300 text-sm italic">"{item.testimonial}"</p>

                                    <div className="flex items-center space-x-2 text-sm text-brand-silver-400 mt-4">
                                        <span>Antes</span>
                                        <div className="w-16 h-1 bg-gradient-to-r from-red-500 via-brand-purple-500 to-brand-neon-green-neon rounded-full" />
                                        <span>Después</span>
                                    </div>
                                </div>
                            </Motion.div>
                        ))}
                    </div>
                </div>

                {/* Videos Section */}
                <div className="mb-16">
                    <div className="flex items-center space-x-3 mb-8">
                        <Play size={24} className="text-brand-neon-green-neon" />
                        <h3 className="text-2xl font-bold text-brand-silver-50">Videos de Transformación</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {videoPlaceholders.map((video, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl overflow-hidden hover:border-brand-neon-green-neon/50 transition-all"
                            >
                                {/* Video Embed Placeholder */}
                                <div className="aspect-video bg-gradient-to-br from-brand-silver-900 to-brand-silver-800 flex items-center justify-center relative">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-brand-neon-green-neon/20 border-2 border-brand-neon-green-neon/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Play size={28} className="text-brand-neon-green-neon ml-1" />
                                        </div>
                                        <p className="text-brand-silver-500 text-sm">Video próximamente</p>
                                        <p className="text-brand-silver-600 text-xs mt-1">Embed YouTube / Vimeo</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="text-lg font-bold text-brand-silver-50 mb-1">{video.title}</h4>
                                    <p className="text-brand-silver-400 text-sm">{video.description}</p>
                                </div>
                            </Motion.div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="mb-16">
                    <div className="flex items-center space-x-3 mb-8">
                        <MessageSquareQuote size={24} className="text-brand-neon-green-neon" />
                        <h3 className="text-2xl font-bold text-brand-silver-50">Testimonios</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl p-6 hover:border-brand-neon-green-neon/50 transition-all"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    {/* Photo Placeholder */}
                                    <div className="w-12 h-12 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-full flex items-center justify-center shadow-lg shadow-brand-purple-500/30">
                                        <User size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-silver-50">{testimonial.name}</h4>
                                        <p className="text-brand-silver-400 text-sm">{testimonial.age} años</p>
                                    </div>
                                </div>

                                <div className="flex text-brand-neon-green-neon mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" />
                                    ))}
                                </div>

                                <p className="text-brand-silver-300 italic leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                            </Motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <Motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-xl text-brand-silver-300 mb-8 max-w-3xl mx-auto">
                        Cada transformación comienza con una decisión. Tu siguiente paso es completar la anamnesis y empezar tu camino.
                    </p>
                    <Motion.button
                        onClick={() => scrollToSection('anamnesis')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400 rounded-full font-bold text-lg text-brand-silver-900 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-brand-neon-green-neon/50 transition-all mx-auto"
                    >
                        <Zap size={22} />
                        <span>Inicia tu transformación</span>
                    </Motion.button>
                </Motion.div>
            </div>
        </section>
    );
};

export default Results;
