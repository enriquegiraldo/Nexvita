import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, CheckCircle, ChevronRight, ChevronLeft,
    Activity, Dumbbell, HeartPulse, User, Calendar
} from 'lucide-react';

const Anamnesis = ({ handleWhatsAppClick }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle, success, error
    const topRef = useRef(null);

    // Initial State with all new fields
    const [formData, setFormData] = useState({
        // Personal
        name: '',
        age: 25,
        weight: 70,
        height: 170,
        phone: '',
        email: '',

        // Deportivo
        sport: '',
        position: '',
        level: 'Amateur', // Recreativo, Amateur, Élite
        dominance: 'Diestro', // Diestro, Zurdo
        experience: 'intermediate', // beginner, intermediate, advanced (legacy mapping)

        // Objetivo & Dolor
        goal: '',
        painLocation: '',
        painLevel: 0,
        painType: '',

        // Entrenamiento
        trainingFrequency: 3,
        trainingHours: 1.5,
        recentChanges: false,

        // Salud / Estilo de Vida
        injuries: '',
        sleepHours: 7,
        stressLevel: 'Medio' // Bajo, Medio, Alto
    });

    const steps = [
        { title: 'Perfil', icon: User },
        { title: 'Objetivos', icon: Activity },
        { title: 'Entreno', icon: Dumbbell },
        { title: 'Salud', icon: HeartPulse }
    ];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = (step) => {
        switch (step) {
            case 0:
                return formData.name && formData.phone && formData.sport;
            case 1:
                return formData.goal.length > 5;
            case 2:
                return formData.trainingFrequency > 0;
            case 3:
                return formData.injuries.length >= 0; // Optional but checked
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
            // Simple mapping for experience legacy field if needed
            // Ensure numeric fields are numbers
            const payload = {
                ...formData,
                age: Number(formData.age),
                weight: Number(formData.weight),
                height: Number(formData.height),
                painLevel: Number(formData.painLevel),
                trainingFrequency: Number(formData.trainingFrequency),
                trainingHours: Number(formData.trainingHours),
                sleepHours: Number(formData.sleepHours)
            };

            const res = await fetch(`${base}/anamnesis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Error en envío');

            setSubmitStatus('success');
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- UI Components ---

    const RangeInput = ({ label, value, min, max, step, unit, onChange, colorClass = "accent-purple-500" }) => (
        <div className="mb-6">
            <div className="flex justify-between mb-2">
                <label className="text-gray-300 font-medium">{label}</label>
                <span className="text-white font-bold bg-gray-800 px-2 py-1 rounded text-sm">
                    {value} <span className="text-gray-400 text-xs">{unit}</span>
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step || 1}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${colorClass}`}
            />
        </div>
    );

    const PillSelector = ({ options, value, onChange }) => (
        <div className="flex flex-wrap gap-2 mb-4">
            {options.map((opt) => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onChange(opt)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${value === opt
                            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-900/40'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    );

    // --- Step Renderers ---

    const Step1_Personal = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Nombre Completo *</label>
                    <input type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)}
                        className="w-full bg-gray-800/50 border border-purple-900/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Tu nombre" />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Teléfono (WhatsApp) *</label>
                    <input type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)}
                        className="w-full bg-gray-800/50 border border-purple-900/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="+57 ..." />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RangeInput label="Edad" value={formData.age} min={16} max={80} unit="años" onChange={v => handleChange('age', v)} />
                <RangeInput label="Peso" value={formData.weight} min={40} max={150} unit="kg" onChange={v => handleChange('weight', v)} />
                <RangeInput label="Estatura" value={formData.height} min={140} max={220} unit="cm" onChange={v => handleChange('height', v)} />
            </div>

            <div className="border-t border-gray-800 pt-6">
                <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
                    <Dumbbell size={18} /> Contexto Deportivo
                </h4>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-1">Deporte Principal *</label>
                    <input type="text" value={formData.sport} onChange={e => handleChange('sport', e.target.value)}
                        className="w-full bg-gray-800/50 border border-purple-900/30 rounded-lg p-3 text-white outline-none" placeholder="Ej: Fútbol, Crossfit, Running" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Nivel</label>
                        <PillSelector options={['Recreativo', 'Amateur', 'Élite']} value={formData.level} onChange={v => handleChange('level', v)} />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Dominancia</label>
                        <PillSelector options={['Diestro', 'Zurdo']} value={formData.dominance} onChange={v => handleChange('dominance', v)} />
                    </div>
                </div>
            </div>
        </div>
    );

    const Step2_Goals = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-purple-400 font-semibold mb-2">¿Cuál es tu objetivo principal?</label>
                <textarea
                    value={formData.goal}
                    onChange={e => handleChange('goal', e.target.value)}
                    className="w-full h-24 bg-gray-800/50 border border-purple-900/30 rounded-lg p-3 text-white outline-none focus:border-purple-500 transition-colors"
                    placeholder="Sé específico: Bajar % grasa, aumentar potencia, mejorar resistencia..."
                />
            </div>

            <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-5">
                <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                    <Activity size={18} /> Evaluación de Dolor (ALICIA)
                </h4>

                <RangeInput
                    label="Intensidad del Dolor (0 = Sin dolor)"
                    value={formData.painLevel}
                    min={0} max={10}
                    unit="/ 10"
                    onChange={v => handleChange('painLevel', v)}
                    colorClass="accent-red-500"
                />

                {formData.painLevel > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-2">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">¿Dónde te duele?</label>
                            <input type="text" value={formData.painLocation} onChange={e => handleChange('painLocation', e.target.value)}
                                className="w-full bg-gray-800/50 border border-red-900/30 rounded-lg p-2 text-white" placeholder="Ej: Rodilla derecha, espalda baja" />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Tipo de dolor</label>
                            <PillSelector
                                options={['Punzante', 'Quemante', 'Opresivo', 'Sordo']}
                                value={formData.painType}
                                onChange={v => handleChange('painType', v)}
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );

    const Step3_Training = () => (
        <div className="space-y-8">
            <h3 className="text-xl font-bold text-white mb-2">Carga de Entrenamiento</h3>

            <div className="grid md:grid-cols-2 gap-8">
                <RangeInput
                    label="Frecuencia Semanal"
                    value={formData.trainingFrequency}
                    min={0} max={14}
                    unit="sesiones"
                    onChange={v => handleChange('trainingFrequency', v)}
                />

                <RangeInput
                    label="Duración Promedio"
                    value={formData.trainingHours}
                    min={0.5} max={5}
                    step={0.5}
                    unit="horas"
                    onChange={v => handleChange('trainingHours', v)}
                />
            </div>

            <div className="bg-blue-900/10 p-4 rounded-xl">
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-200">¿Cambios recientes en el entrenamiento?</span>
                    <button
                        type="button"
                        onClick={() => handleChange('recentChanges', !formData.recentChanges)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.recentChanges ? 'bg-blue-500' : 'bg-gray-700'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${formData.recentChanges ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </label>
                <p className="text-xs text-gray-500 mt-2">Aumentos bruscos en carga, superficie diferente, calzado nuevo, etc.</p>
            </div>
        </div>
    );

    const Step4_History = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-gray-300 mb-2">Historial de Lesiones y Cirugías</label>
                <textarea
                    value={formData.injuries}
                    onChange={e => handleChange('injuries', e.target.value)}
                    className="w-full h-32 bg-gray-800/50 border border-purple-900/30 rounded-lg p-3 text-white outline-none"
                    placeholder="Menciona lesiones antiguas, cirugías o condiciones médicas relevantes..."
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Nivel de Estrés Diario</label>
                    <PillSelector options={['Bajo', 'Medio', 'Alto']} value={formData.stressLevel} onChange={v => handleChange('stressLevel', v)} />
                </div>
                <div>
                    <RangeInput
                        label="Horas de Sueño"
                        value={formData.sleepHours}
                        min={3} max={12}
                        step={0.5}
                        unit="horas"
                        onChange={v => handleChange('sleepHours', v)}
                        colorClass="accent-blue-400"
                    />
                </div>
            </div>
        </div>
    );

    if (submitStatus === 'success') {
        return (
            <section className="py-24 px-4 min-h-[60vh] flex items-center justify-center bg-[#0a0a0a]">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-lg"
                >
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">¡Anamnesis Enviada!</h2>
                    <p className="text-gray-400 mb-8">Gracias, {formData.name}. Hemos guardado tu perfil atlético. Kevin revisará tus datos para optimizar tu plan.</p>
                    <button
                        onClick={handleWhatsAppClick}
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 mx-auto"
                    >
                        <Send size={20} /> Contactar por WhatsApp
                    </button>
                    <button
                        onClick={() => { setSubmitStatus('idle'); setFormData({ ...formData, name: '' }); setCurrentStep(0); }}
                        className="mt-6 text-gray-500 text-sm hover:text-white"
                    >
                        Enviar otra respuesta
                    </button>
                </motion.div>
            </section>
        );
    }

    return (
        <section ref={topRef} id="anamnesis" className="py-20 px-4 bg-[#0a0a0a] relative min-h-screen">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm font-medium mb-4"
                    >
                        Perfil Atlético Profesional
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Anamnesis Digital</h2>
                    <p className="text-gray-400">Cuéntanos sobre ti para diseñar tu estrategia.</p>
                </div>

                {/* Progress Stepper */}
                <div className="mb-8 flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 rounded-full" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500 -z-10 rounded-full transition-all duration-500"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = idx <= currentStep;
                        return (
                            <div key={idx} className="flex flex-col items-center gap-2 bg-[#0a0a0a] px-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                    ${isActive ? 'border-purple-500 bg-purple-900/20 text-white' : 'border-gray-700 bg-gray-900 text-gray-500'}`}
                                >
                                    <Icon size={18} />
                                </div>
                                <span className={`text-xs font-medium transition-colors ${isActive ? 'text-purple-400' : 'text-gray-600'}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Form Container */}
                <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                        <div className="flex-1 relative">
                            <AnimatePresence custom={direction} mode="wait">
                                <motion.div
                                    key={currentStep}
                                    variants={variants}
                                    custom={direction}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "tween", duration: 0.3 }}
                                    className="w-full"
                                >
                                    {currentStep === 0 && <Step1_Personal />}
                                    {currentStep === 1 && <Step2_Goals />}
                                    {currentStep === 2 && <Step3_Training />}
                                    {currentStep === 3 && <Step4_History />}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-800">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors
                                    ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <ChevronLeft size={20} /> Anterior
                            </button>

                            {currentStep === steps.length - 1 ? (
                                <button
                                    type="submit"
                                    disabled={!validateStep(currentStep) || isSubmitting}
                                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-purple-900/20 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Enviando
                                        </span>
                                    ) : (
                                        <>Finalizar <Send size={18} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!validateStep(currentStep)}
                                    className="bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Siguiente <ChevronRight size={18} />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Anamnesis;
