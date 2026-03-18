import { motion as Motion } from 'framer-motion';
import { Dumbbell, Target, Zap, Shield, Award, Heart, Image } from 'lucide-react';

// TODO: Reemplazar placeholders con fotos reales cuando Kevin las envíe

const About = ({ scrollToSection }) => {
    const specialties = [
        { icon: <Dumbbell size={24} />, text: "Calistenia", color: "from-brand-purple-600 to-brand-purple-400" },
        { icon: <Target size={24} />, text: "Gym Híbrido", color: "from-brand-purple-600 to-brand-purple-400" },
        { icon: <Heart size={24} />, text: "Nutrición Deportiva", color: "from-brand-neon-green-neon to-brand-neon-green-500" },
    ];

    const certifications = [
        "Entrenador Personal Certificado",
        "Especialista en Calistenia",
        "Asesor Nutricional Deportivo",
        "Evaluación Física y Adipometría",
    ];

    // TODO: Reemplazar con fotos reales de Kevin
    const galleryPlaceholders = [
        "Entrenando calistenia",
        "Sesión con cliente",
        "Gym híbrido",
        "Resultados de clientes",
    ];

    return (
        <section id="about" className="py-24 px-4 relative overflow-hidden bg-brand-silver-900">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-silver-900 via-brand-silver-800 to-brand-silver-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/10 via-transparent to-brand-purple-800/5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto relative">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 via-brand-neon-green-neon to-brand-silver-200">
                            Quién soy / Mi Historia
                        </span>
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-brand-purple-500 via-brand-neon-green-neon to-brand-purple-500 mx-auto rounded-full" />
                </Motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Profile Photo */}
                    <Motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Efecto Glow Externo */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple-600 to-brand-neon-green-neon rounded-3xl opacity-20 blur-xl" />
                            
                            {/* Contenedor Principal */}
                            {/* TODO: Reemplazar con foto profesional real de Kevin */}
                            <div className="relative bg-gradient-to-br from-brand-silver-900 to-brand-silver-800 border-2 border-brand-purple-500/30 rounded-3xl overflow-hidden">
                                <div className="aspect-square flex items-center justify-center relative">
                                    {/* Placeholder photo */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/30 to-brand-silver-900" />

                                    {/* Contenido */}
                                    <div className="text-center p-8 relative z-10">
                                        {/* Círculo con las iniciales */}
                                        <div className="w-48 h-48 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-purple-500/30">
                                            <div className="w-40 h-40 bg-brand-silver-800/90 rounded-full border-2 border-brand-neon-green-neon flex items-center justify-center backdrop-blur-sm">
                                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-neon-green-neon">
                                                    KL
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Nombre y Título */}
                                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 to-brand-neon-green-neon">
                                            Kevin Leandro
                                        </h3>
                                        <p className="text-brand-silver-400 mt-2 font-medium">Entrenador Personal · Calistenia & Gym</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Elemento Decorativo */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-neon-green-neon/20 rounded-full mix-blend-screen filter blur-2xl opacity-40" />
                    </Motion.div>

                    {/* Biography */}
                    <Motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 via-brand-neon-green-neon to-brand-silver-200">
                            Kevin Leandro
                        </h3>

                        {/* TODO: Kevin completará este texto con su historia real */}
                        <p className="text-brand-silver-300 mb-4 text-lg leading-relaxed">
                            <span className="text-brand-neon-green-neon font-semibold">Kevin Leandro</span>, 
                            entrenador personal certificado especializado en calistenia y entrenamiento híbrido. 
                            Mi camino comenzó en la calistenia, dominando el peso corporal como herramienta 
                            principal de cambio, y evolucioné hacia un enfoque que combina lo mejor 
                            de la calistenia con el gimnasio tradicional.
                        </p>

                        <p className="text-brand-silver-300 mb-6 text-lg leading-relaxed italic text-brand-silver-500">
                            [Kevin completará este texto con su historia, experiencia y certificaciones]
                        </p>

                        {/* Especialidades / Badges */}
                        <div className="space-y-4">
                            {specialties.map((item, index) => (
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
                    </Motion.div>
                </div>

                {/* Galería de Fotos */}
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 to-brand-silver-200 text-center">
                        Galería
                    </h3>
                    {/* TODO: Reemplazar placeholders con fotos reales */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryPlaceholders.map((label, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="aspect-square bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 border border-brand-purple-600/30 rounded-xl flex flex-col items-center justify-center hover:border-brand-neon-green-neon/50 transition-all"
                            >
                                <Image size={32} className="text-brand-silver-600 mb-3" />
                                <p className="text-brand-silver-500 text-xs text-center px-2">{label}</p>
                                <p className="text-brand-silver-600 text-xs mt-1">Próximamente</p>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>

                {/* Certificaciones */}
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl p-8"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-500 rounded-lg">
                            <Award size={28} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-silver-50 to-brand-silver-200">
                            Experiencia & Certificaciones
                        </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {certifications.map((cert, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="w-2 h-2 bg-brand-neon-green-neon rounded-full flex-shrink-0" />
                                <p className="text-brand-silver-300">{cert}</p>
                            </Motion.div>
                        ))}
                    </div>
                    <p className="text-brand-silver-500 text-sm mt-4 italic">
                        * Las certificaciones específicas serán actualizadas próximamente con documentación oficial.
                    </p>
                </Motion.div>
            </div>
        </section>
    );
};

export default About;
