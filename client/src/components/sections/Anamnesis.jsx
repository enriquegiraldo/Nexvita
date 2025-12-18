import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, CheckCircle, ChevronRight, ChevronLeft,
    Activity, Dumbbell, HeartPulse, User, AlertCircle
} from 'lucide-react';

// ============ UTILIDADES ============

/**
 * Valida formato de teléfono colombiano
 */
const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 12;
};

/**
 * Valida formato de email
 */
const validateEmail = (email) => {
    if (!email) return true; // Email es opcional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Formatea número de teléfono mientras escribe
 */
const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 10) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 12)}`;
};

// ============ COMPONENTES AUXILIARES ============

/**
 * Input con validación visual mejorada
 */
const ValidatedInput = ({
    label,
    value,
    onChange,
    error,
    required = false,
    id,
    ...props
}) => (
    <div>
        <label htmlFor={id} className="block text-brand-silver-300 text-sm mb-2">
            {label} {required && <span className="text-brand-neon-green-neon">*</span>}
        </label>
        <input
            id={id}
            value={value || ''}
            onChange={onChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`w-full px-4 py-3 bg-brand-silver-800/50 border rounded-lg text-white 
                focus:outline-none focus:ring-2 transition-all
                ${error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-brand-purple-600/30 focus:ring-brand-purple-500 focus:border-brand-neon-green-neon/50'
                }`}
            {...props}
        />
        {error && (
            <p id={`${id}-error`} className="text-red-400 text-xs mt-1 flex items-center gap-1" role="alert">
                <AlertCircle size={12} /> {error}
            </p>
        )}
    </div>
);

/**
 * Slider mejorado con accesibilidad
 */
const RangeInput = ({
    label,
    value,
    min,
    max,
    step = 1,
    unit,
    onChange,
    colorClass = "accent-brand-purple-500",
    showValue = true,
    id
}) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
                <label htmlFor={id} className="text-brand-silver-300 font-medium text-sm">
                    {label}
                </label>
                {showValue && (
                    <span
                        className="text-white font-bold bg-brand-silver-800 px-3 py-1 rounded-lg text-sm border border-brand-purple-600/30"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {value} <span className="text-brand-silver-400 text-xs">{unit}</span>
                    </span>
                )}
            </div>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={`${value} ${unit}`}
                className={`w-full h-2 bg-brand-silver-800 rounded-lg appearance-none cursor-pointer ${colorClass} slider`}
                style={{
                    background: `linear-gradient(to right, 
                        var(--color-brand-purple-600) 0%, 
                        var(--color-brand-purple-600) ${percentage}%, 
                        var(--color-brand-silver-800) ${percentage}%, 
                        var(--color-brand-silver-800) 100%)`
                }}
            />
            <div className="flex justify-between text-xs text-brand-silver-500 mt-1">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

/**
 * Selector de pills con mejor UX y accesibilidad
 */
const PillSelector = ({
    options,
    value,
    onChange,
    label,
    required = false
}) => (
    <div className="mb-4">
        {label && (
            <label className="block text-brand-silver-300 text-sm mb-2">
                {label} {required && <span className="text-brand-neon-green-neon">*</span>}
            </label>
        )}
        <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
            {options.map((opt) => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onChange(opt)}
                    aria-pressed={value === opt}
                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                        ${value === opt
                            ? 'bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 text-white shadow-lg shadow-brand-purple-500/40 scale-105'
                            : 'bg-brand-silver-800/50 text-brand-silver-300 hover:bg-brand-silver-700 border border-brand-silver-700 hover:border-brand-purple-600/50'
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

// ============ PASOS DEL FORMULARIO ============

/**
 * Paso 1: Datos Personales (con validación mejorada)
 */
const Step1_Personal = ({ formData, handleChange, errors }) => (
    <div className="space-y-6">
        <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <User size={20} className="text-brand-purple-400" />
                Información Personal
            </h3>
            <p className="text-brand-silver-400 text-sm">Datos básicos para tu perfil atlético</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ValidatedInput
                id="name"
                label="Nombre Completo"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                placeholder="Tu nombre completo"
                autoComplete="name"
                required
            />
            <ValidatedInput
                id="phone"
                label="Teléfono (WhatsApp)"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
                error={errors.phone}
                placeholder="+57 300 123 4567"
                autoComplete="tel"
                required
            />
        </div>

        {/* Sliders para datos numéricos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <RangeInput
                id="age"
                label="Edad"
                value={formData.age}
                min={16}
                max={80}
                unit="años"
                onChange={(v) => handleChange('age', v)}
            />
            <RangeInput
                id="weight"
                label="Peso"
                value={formData.weight}
                min={40}
                max={150}
                unit="kg"
                onChange={(v) => handleChange('weight', v)}
            />
            <RangeInput
                id="height"
                label="Estatura"
                value={formData.height}
                min={140}
                max={220}
                unit="cm"
                onChange={(v) => handleChange('height', v)}
            />
        </div>

        {/* Contexto Deportivo */}
        <div className="border-t border-brand-silver-700 pt-6">
            <h4 className="text-brand-purple-400 font-semibold mb-4 flex items-center gap-2">
                <Dumbbell size={18} /> Contexto Deportivo
            </h4>

            <ValidatedInput
                id="sport"
                label="Deporte Principal"
                type="text"
                value={formData.sport}
                onChange={(e) => handleChange('sport', e.target.value)}
                error={errors.sport}
                placeholder="Ej: Fútbol, Crossfit, Running, Natación"
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <PillSelector
                    name="level"
                    label="Nivel Deportivo"
                    options={['Recreativo', 'Amateur', 'Élite']}
                    value={formData.level}
                    onChange={(v) => handleChange('level', v)}
                    required
                />
                <PillSelector
                    name="dominance"
                    label="Dominancia"
                    options={['Diestro', 'Zurdo']}
                    value={formData.dominance}
                    onChange={(v) => handleChange('dominance', v)}
                />
            </div>

            {(formData.sport?.toLowerCase().includes('fútbol') ||
                formData.sport?.toLowerCase().includes('futbol')) && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                        >
                            <ValidatedInput
                                id="position"
                                label="Posición"
                                type="text"
                                value={formData.position}
                                onChange={(e) => handleChange('position', e.target.value)}
                                placeholder="Ej: Delantero, Defensa, Portero"
                            />
                        </motion.div>
                    </AnimatePresence>
                )}
        </div>
    </div>
);

/**
 * Paso 2: Objetivos (con contador de caracteres mejorado)
 */
const Step2_Goals = ({ formData, handleChange, errors }) => {
    const goalLength = formData.goal?.length || 0;
    const minLength = 10;
    const isValid = goalLength >= minLength;

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Activity size={20} className="text-brand-purple-400" />
                    Objetivo Principal
                </h3>
                <p className="text-brand-silver-400 text-sm">Describe qué buscas lograr</p>
            </div>

            <div className="mb-6">
                <label htmlFor="goal" className="block text-brand-silver-300 text-sm mb-2">
                    ¿Cuál es tu objetivo principal? <span className="text-brand-neon-green-neon">*</span>
                </label>
                <textarea
                    id="goal"
                    value={formData.goal || ''}
                    onChange={(e) => handleChange('goal', e.target.value)}
                    aria-invalid={errors.goal ? 'true' : 'false'}
                    aria-describedby="goal-help goal-error"
                    className={`w-full h-32 px-4 py-3 rounded-lg text-white 
                        focus:outline-none focus:ring-2 transition-all resize-none
                        ${errors.goal
                            ? 'bg-red-900/10 border-2 border-red-500 focus:ring-red-500'
                            : 'bg-brand-silver-800/50 border border-brand-purple-600/30 focus:ring-brand-purple-500 focus:border-brand-neon-green-neon/50'
                        }`}
                    placeholder="Sé específico: Bajar % grasa, aumentar potencia, mejorar resistencia..."
                />
                <div className="flex justify-between items-center mt-1">
                    <p id="goal-help" className="text-xs text-brand-silver-500">
                        Mínimo {minLength} caracteres para una descripción útil
                    </p>
                    <span className={`text-xs font-medium ${isValid ? 'text-brand-neon-green-neon' : 'text-brand-silver-500'}`}>
                        {goalLength}/{minLength}
                    </span>
                </div>
                {errors.goal && (
                    <p id="goal-error" className="text-red-400 text-xs mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle size={12} /> {errors.goal}
                    </p>
                )}
            </div>

            {/* Evaluación de Dolor ALICIA */}
            <div className="bg-gradient-to-br from-red-900/10 to-red-800/5 border border-red-900/30 rounded-xl p-5">
                <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                    <AlertCircle size={18} /> Evaluación de Dolor (ALICIA)
                </h4>
                <p className="text-brand-silver-400 text-xs mb-4">
                    Si experimentas dolor, evalúa su intensidad y características
                </p>

                <RangeInput
                    id="painLevel"
                    label="Intensidad del Dolor"
                    value={formData.painLevel}
                    min={0}
                    max={10}
                    unit="/ 10"
                    onChange={(v) => handleChange('painLevel', v)}
                    colorClass="accent-red-500"
                />

                <AnimatePresence>
                    {formData.painLevel > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 pt-4 border-t border-red-900/20"
                        >
                            <ValidatedInput
                                id="painLocation"
                                label="¿Dónde te duele?"
                                type="text"
                                value={formData.painLocation}
                                onChange={(e) => handleChange('painLocation', e.target.value)}
                                placeholder="Ej: Rodilla derecha, espalda baja"
                            />
                            <PillSelector
                                name="painType"
                                label="Tipo de dolor"
                                options={['Punzante', 'Quemante', 'Opresivo', 'Sordo', 'Pulsátil']}
                                value={formData.painType}
                                onChange={(v) => handleChange('painType', v)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/**
 * Paso 3: Entrenamiento
 */
const Step3_Training = ({ formData, handleChange }) => (
    <div className="space-y-6">
        <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Dumbbell size={20} className="text-brand-purple-400" />
                Carga de Entrenamiento
            </h3>
            <p className="text-brand-silver-400 text-sm">Información sobre tu rutina actual</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RangeInput
                id="trainingFrequency"
                label="Frecuencia Semanal"
                value={formData.trainingFrequency}
                min={0}
                max={14}
                unit="sesiones/semana"
                onChange={(v) => handleChange('trainingFrequency', v)}
            />

            <RangeInput
                id="trainingHours"
                label="Duración Promedio"
                value={formData.trainingHours}
                min={0.5}
                max={5}
                step={0.5}
                unit="horas/sesión"
                onChange={(v) => handleChange('trainingHours', v)}
            />
        </div>

        {/* Toggle accesible */}
        <div className="bg-gradient-to-br from-brand-purple-900/10 to-brand-purple-800/5 border border-brand-purple-600/30 p-5 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <label htmlFor="recentChanges" className="text-brand-silver-200 font-medium block cursor-pointer">
                        ¿Cambios recientes en el entrenamiento?
                    </label>
                    <p className="text-xs text-brand-silver-500 mt-1">
                        Aumentos bruscos en carga, superficie diferente, calzado nuevo, etc.
                    </p>
                </div>
                <button
                    id="recentChanges"
                    type="button"
                    role="switch"
                    aria-checked={formData.recentChanges}
                    aria-label="Cambios recientes en entrenamiento"
                    onClick={() => handleChange('recentChanges', !formData.recentChanges)}
                    className={`ml-4 w-14 h-7 rounded-full p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-500 ${formData.recentChanges
                        ? 'bg-gradient-to-r from-brand-purple-600 to-brand-purple-400'
                        : 'bg-brand-silver-700'
                        }`}
                >
                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ${formData.recentChanges ? 'translate-x-7' : 'translate-x-0'
                        }`} />
                </button>
            </div>
        </div>
    </div>
);

/**
 * Paso 4: Historial
 */
const Step4_History = ({ formData, handleChange, errors }) => (
    <div className="space-y-6">
        <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <HeartPulse size={20} className="text-brand-purple-400" />
                Historial Médico y Estilo de Vida
            </h3>
            <p className="text-brand-silver-400 text-sm">Información relevante para tu plan</p>
        </div>

        <div className="mb-6">
            <label htmlFor="injuries" className="block text-brand-silver-300 text-sm mb-2">
                Historial de Lesiones y Cirugías
            </label>
            <textarea
                id="injuries"
                value={formData.injuries || ''}
                onChange={(e) => handleChange('injuries', e.target.value)}
                className="w-full h-32 px-4 py-3 bg-brand-silver-800/50 border border-brand-purple-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-purple-500 focus:border-brand-neon-green-neon/50 transition-all resize-none"
                placeholder="Menciona lesiones antiguas, cirugías o escribe 'ninguna'..."
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PillSelector
                name="stressLevel"
                label="Nivel de Estrés Diario"
                options={['Bajo', 'Medio', 'Alto']}
                value={formData.stressLevel}
                onChange={(v) => handleChange('stressLevel', v)}
            />
            <RangeInput
                id="sleepHours"
                label="Horas de Sueño"
                value={formData.sleepHours}
                min={3}
                max={12}
                step={0.5}
                unit="horas/noche"
                onChange={(v) => handleChange('sleepHours', v)}
                colorClass="accent-brand-neon-green-neon"
            />
        </div>

        <ValidatedInput
            id="email"
            label="Email (Opcional)"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="tu@email.com"
            autoComplete="email"
        />
    </div>
);

// ============ COMPONENTE PRINCIPAL ============

const Anamnesis = ({ handleWhatsAppClick }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    const topRef = useRef(null);

    const [formData, setFormData] = useState({
        // Personal
        name: '',
        age: 25,
        weight: 70,
        height: 170,
        phone: '',
        email: '',
        sport: '',
        position: '',
        level: 'Amateur',
        dominance: 'Diestro',
        goal: '',
        painLocation: '',
        painLevel: 0,
        painType: '',
        trainingFrequency: 3,
        trainingHours: 1.5,
        recentChanges: false,
        injuries: '',
        sleepHours: 7,
        stressLevel: 'Medio'
    });

    const steps = useMemo(() => [
        { title: 'Perfil', icon: User, description: 'Datos personales y contexto deportivo' },
        { title: 'Objetivos', icon: Activity, description: 'Motivo de consulta y evaluación' },
        { title: 'Entreno', icon: Dumbbell, description: 'Carga de entrenamiento actual' },
        { title: 'Salud', icon: HeartPulse, description: 'Historial médico y estilo de vida' }
    ], []);

    // Scroll mejorado - solo cuando cambia el paso, no durante escritura
    useEffect(() => {
        const timer = setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
    }, [currentStep]);

    /**
     * Maneja cambios con validación en tiempo real
     */
    const handleChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Limpiar error del campo cuando el usuario empieza a corregir
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    }, [errors]);

    /**
     * Validación mejorada con mensajes específicos
     */
    const validateStep = useCallback((step) => {
        const newErrors = {};

        switch (step) {
            case 0:
                if (!formData.name.trim()) {
                    newErrors.name = 'El nombre es requerido';
                } else if (formData.name.trim().length < 3) {
                    newErrors.name = 'El nombre debe tener al menos 3 caracteres';
                }

                if (!formData.phone.trim()) {
                    newErrors.phone = 'El teléfono es requerido';
                } else if (!validatePhone(formData.phone)) {
                    newErrors.phone = 'Formato de teléfono inválido (mínimo 10 dígitos)';
                }

                if (!formData.sport.trim()) {
                    newErrors.sport = 'El deporte es requerido';
                }
                break;

            case 1:
                if (formData.goal.trim().length < 10) {
                    newErrors.goal = 'Describe tu objetivo con al menos 10 caracteres';
                }
                break;

            case 2:
                if (formData.trainingFrequency === 0) {
                    newErrors.trainingFrequency = 'Indica tu frecuencia de entrenamiento';
                }
                break;

            case 3:
                if (formData.email && !validateEmail(formData.email)) {
                    newErrors.email = 'Formato de email inválido';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    /**
     * Navegación con validación
     */
    const nextStep = useCallback(() => {
        if (validateStep(currentStep) && currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, steps.length, validateStep]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setErrors({}); // Limpiar errores al retroceder
        }
    }, [currentStep]);

    /**
     * Envío optimizado con mejor manejo de errores
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

            const payload = {
                ...formData,
                age: Number(formData.age),
                weight: Number(formData.weight),
                height: Number(formData.height),
                painLevel: Number(formData.painLevel),
                trainingFrequency: Number(formData.trainingFrequency),
                trainingHours: Number(formData.trainingHours),
                sleepHours: Number(formData.sleepHours),
                submittedAt: new Date().toISOString()
            };

            const res = await fetch(`${base}/anamnesis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al enviar');
            }

            setSubmitStatus('success');
        } catch (error) {
            console.error('Error submitting:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Navegación por teclado
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Solo si no está escribiendo en un input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.key === 'ArrowRight' && currentStep < steps.length - 1) {
                e.preventDefault();
                nextStep();
            } else if (e.key === 'ArrowLeft' && currentStep > 0) {
                e.preventDefault();
                prevStep();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentStep, steps.length, nextStep, prevStep]);

    // ============ PANTALLA DE ÉXITO ============

    if (submitStatus === 'success') {
        return (
            <section className="py-24 px-4 min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#0d1117] to-[#161b22]">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-lg mx-auto"
                >
                    <div className="w-24 h-24 bg-brand-neon-green-neon/20 border-2 border-brand-neon-green-neon rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-brand-neon-green-neon" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-neon-green-neon">
                            ¡Anamnesis Enviada!
                        </span>
                    </h2>
                    <p className="text-brand-silver-300 mb-8 text-lg">
                        Gracias, <span className="text-brand-purple-400 font-semibold">{formData.name}</span>.
                        Kevin revisará tus datos para optimizar tu plan personalizado.
                    </p>
                    <motion.button
                        onClick={handleWhatsAppClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 hover:from-brand-purple-500 hover:to-brand-purple-300 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-purple-500/30 mx-auto"
                    >
                        <Send size={20} /> Contactar por WhatsApp
                    </motion.button>
                </motion.div>
            </section>
        );
    }

    // ============ RENDER PRINCIPAL ============

    return (
        <section
            ref={topRef}
            id="anamnesis"
            className="py-20 px-4 bg-gradient-to-b from-[#0d1117] to-[#161b22] relative min-h-screen"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117]" />
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-purple-900/10 to-transparent" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-brand-purple-900/30 border border-brand-purple-500/30 text-brand-purple-300 text-sm font-medium mb-4"
                    >
                        Perfil Atlético Profesional
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                            Anamnesis Digital
                        </span>
                    </h2>
                    <p className="text-brand-silver-400">Diseñamos tu estrategia de alto rendimiento</p>
                </div>

                {/* Progress Stepper */}
                <div className="mb-8 relative" aria-label="Progreso del formulario">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-silver-800 -z-10 rounded-full" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-brand-purple-600 via-brand-neon-green-neon to-brand-purple-600 -z-10 rounded-full transition-all duration-500"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        role="progressbar"
                        aria-valuenow={currentStep + 1}
                        aria-valuemin={1}
                        aria-valuemax={steps.length}
                    />

                    <div className="flex justify-between items-center relative">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const isActive = idx <= currentStep;
                            const isCurrent = idx === currentStep;

                            return (
                                <div key={idx} className="flex flex-col items-center gap-2 bg-transparent px-2 relative z-10">
                                    <motion.button
                                        type="button"
                                        onClick={() => idx < currentStep && setCurrentStep(idx)}
                                        disabled={idx > currentStep}
                                        aria-label={`${step.title}: ${step.description}`}
                                        aria-current={isCurrent ? 'step' : undefined}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCurrent
                                            ? 'border-brand-neon-green-neon bg-brand-neon-green-neon/20 text-brand-neon-green-neon shadow-lg shadow-brand-neon-green-neon/30'
                                            : isActive
                                                ? 'border-brand-purple-500 bg-brand-purple-900/20 text-brand-purple-400 cursor-pointer hover:scale-110'
                                                : 'border-brand-silver-700 bg-brand-silver-900 text-brand-silver-600 cursor-not-allowed'
                                            }`}
                                        animate={{ scale: isCurrent ? 1.1 : 1 }}
                                    >
                                        <Icon size={20} />
                                    </motion.button>
                                    <span className={`text-xs font-medium transition-colors text-center max-w-[80px] ${isCurrent ? 'text-brand-neon-green-neon' :
                                        isActive ? 'text-brand-purple-400' : 'text-brand-silver-600'
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-gradient-to-br from-brand-silver-800/50 to-brand-silver-900/50 backdrop-blur-sm border border-brand-purple-600/30 rounded-2xl p-6 md:p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="min-h-[500px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentStep === 0 && <Step1_Personal formData={formData} handleChange={handleChange} errors={errors} />}
                                    {currentStep === 1 && <Step2_Goals formData={formData} handleChange={handleChange} errors={errors} />}
                                    {currentStep === 2 && <Step3_Training formData={formData} handleChange={handleChange} />}
                                    {currentStep === 3 && <Step4_History formData={formData} handleChange={handleChange} errors={errors} />}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Error message */}
                        <AnimatePresence>
                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-4 p-4 bg-red-900/20 border border-red-900/30 rounded-lg text-red-400 text-sm flex items-center gap-2"
                                    role="alert"
                                >
                                    <AlertCircle size={16} />
                                    Error al enviar. Intenta nuevamente o contacta por WhatsApp.
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation buttons */}
                        <div className="mt-8 flex justify-between items-center pt-6 border-t border-brand-silver-700">
                            <motion.button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                                whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                                className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-all ${currentStep === 0
                                    ? 'opacity-0 pointer-events-none'
                                    : 'text-brand-silver-400 hover:text-white hover:bg-brand-silver-800/50'
                                    }`}
                                aria-label="Paso anterior"
                            >
                                <ChevronLeft size={20} /> Anterior
                            </motion.button>

                            {currentStep === steps.length - 1 ? (
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                                    className="bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 hover:from-brand-purple-500 hover:to-brand-purple-300 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-purple-500/30 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Enviar formulario"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Finalizar <Send size={18} />
                                        </>
                                    )}
                                </motion.button>
                            ) : (
                                <motion.button
                                    type="button"
                                    onClick={nextStep}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-brand-silver-200 to-white text-brand-silver-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-all shadow-lg"
                                    aria-label="Siguiente paso"
                                >
                                    Siguiente <ChevronRight size={18} />
                                </motion.button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Progress indicator */}
                <div className="mt-4 text-center">
                    <p className="text-brand-silver-500 text-sm" role="status" aria-live="polite">
                        Paso {currentStep + 1} de {steps.length} • {Math.round(((currentStep + 1) / steps.length) * 100)}% completado
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Anamnesis;
