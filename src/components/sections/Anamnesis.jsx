import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';

const Anamnesis = ({ handleWhatsAppClick }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        goal: '',
        injuries: '',
        experience: '',
        email: '',
        phone: ''
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to Supabase
        setIsFormSubmitted(true);
        setTimeout(() => {
            setIsFormSubmitted(false);
            setFormData({
                name: '',
                age: '',
                weight: '',
                height: '',
                goal: '',
                injuries: '',
                experience: '',
                email: '',
                phone: ''
            });
        }, 5000);
    };

    return (
        <section id="anamnesis" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(188,19,254,0.1),transparent_40%)]" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Anamnesis Digital
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-purple-900/50 rounded-2xl p-6 md:p-8"
                >
                    {!isFormSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 mb-2">Nombre completo</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="Tu teléfono"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">Edad</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="Tu edad"
                                        min="16"
                                        max="100"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">Peso (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="Tu peso"
                                        min="30"
                                        max="300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">Estatura (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                                        placeholder="Tu estatura"
                                        min="100"
                                        max="250"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">Experiencia en ejercicio</label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white appearance-none"
                                        required
                                    >
                                        <option value="">Selecciona tu nivel</option>
                                        <option value="beginner">Principiante</option>
                                        <option value="intermediate">Intermedio</option>
                                        <option value="advanced">Avanzado</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Objetivo principal</label>
                                <textarea
                                    name="goal"
                                    value={formData.goal}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white h-24"
                                    placeholder="¿Qué objetivo buscas alcanzar? (Ej: bajar de peso, ganar músculo, mejorar rendimiento)"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Lesiones o condiciones médicas</label>
                                <textarea
                                    name="injuries"
                                    value={formData.injuries}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white h-24"
                                    placeholder="Describe cualquier lesión o condición médica que deba considerar (si no tienes, escribe 'ninguna')"
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                            >
                                <Send size={22} />
                                <span>Enviar información</span>
                            </motion.button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={48} className="text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                                ¡Formulario enviado!
                            </h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                Gracias por completar tu anamnesis. Kevin revisará tu información y se pondrá en contacto contigo vía WhatsApp para continuar con tu transformación.
                            </p>
                            <motion.button
                                onClick={handleWhatsAppClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                            >
                                <MessageCircle size={22} />
                                <span>Contactar por WhatsApp</span>
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Anamnesis;
