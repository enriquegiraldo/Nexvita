import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Send, CheckCircle, ChevronRight, ChevronLeft,
    Activity, Dumbbell, HeartPulse, User, AlertCircle,
    Phone, Target, Apple, FileCheck
} from 'lucide-react';

// ============ UTILIDADES ============

const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 12;
};

const validateEmail = (email) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 10) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 12)}`;
};

// ============ COMPONENTES AUXILIARES ============

const ValidatedInput = ({
    label, value, onChange, error, required = false, id, ...props
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

const ValidatedSelect = ({
    label, value, onChange, options, error, required = false, id, placeholder = 'Seleccionar...'
}) => (
    <div>
        <label htmlFor={id} className="block text-brand-silver-300 text-sm mb-2">
            {label} {required && <span className="text-brand-neon-green-neon">*</span>}
        </label>
        <select
            id={id}
            value={value || ''}
            onChange={onChange}
            className={`w-full px-4 py-3 bg-brand-silver-800/50 border rounded-lg text-white 
                focus:outline-none focus:ring-2 transition-all
                ${error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-brand-purple-600/30 focus:ring-brand-purple-500 focus:border-brand-neon-green-neon/50'
                }`}
        >
            <option value="" className="bg-brand-silver-900">{placeholder}</option>
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-brand-silver-900">{opt}</option>
            ))}
        </select>
        {error && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1" role="alert">
                <AlertCircle size={12} /> {error}
            </p>
        )}
    </div>
);

const ValidatedTextarea = ({
    label, value, onChange, error, required = false, id, ...props
}) => (
    <div>
        <label htmlFor={id} className="block text-brand-silver-300 text-sm mb-2">
            {label} {required && <span className="text-brand-neon-green-neon">*</span>}
        </label>
        <textarea
            id={id}
            value={value || ''}
            onChange={onChange}
            className={`w-full h-28 px-4 py-3 bg-brand-silver-800/50 border rounded-lg text-white 
                focus:outline-none focus:ring-2 transition-all resize-none
                ${error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-brand-purple-600/30 focus:ring-brand-purple-500 focus:border-brand-neon-green-neon/50'
                }`}
            {...props}
        />
        {error && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1" role="alert">
                <AlertCircle size={12} /> {error}
            </p>
        )}
    </div>
);

const RangeInput = ({ label, value, min, max, step = 1, unit, onChange, id }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
                <label htmlFor={id} className="text-brand-silver-300 font-medium text-sm">{label}</label>
                <span className="text-white font-bold bg-brand-silver-800 px-3 py-1 rounded-lg text-sm border border-brand-purple-600/30">
                    {value} <span className="text-brand-silver-400 text-xs">{unit}</span>
                </span>
            </div>
            <input
                id={id} type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-brand-silver-800 rounded-lg appearance-none cursor-pointer accent-brand-purple-500 slider"
                style={{
                    background: `linear-gradient(to right, 
                        var(--color-brand-purple-600) 0%, 
                        var(--color-brand-purple-600) ${percentage}%, 
                        var(--color-brand-silver-800) ${percentage}%, 
                        var(--color-brand-silver-800) 100%)`
                }}
            />
            <div className="flex justify-between text-xs text-brand-silver-500 mt-1">
                <span>{min}</span><span>{max}</span>
            </div>
        </div>
    );
};

const CheckboxGroup = ({ label, options, values, onChange, required = false }) => (
    <div className="mb-4">
        <label className="block text-brand-silver-300 text-sm mb-3">
            {label} {required && <span className="text-brand-neon-green-neon">*</span>}
        </label>
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
                const isSelected = values?.includes(opt);
                return (
                    <button
                        key={opt} type="button"
                        onClick={() => {
                            if (opt === 'Ninguna' || opt === 'Ninguna aún' || opt === 'Ninguno') {
                                onChange([opt]);
                            } else {
                                const filtered = (values || []).filter(v => v !== 'Ninguna' && v !== 'Ninguna aún' && v !== 'Ninguno');
                                onChange(isSelected ? filtered.filter(v => v !== opt) : [...filtered, opt]);
                            }
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                            ${isSelected
                                ? 'bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 text-white shadow-lg shadow-brand-purple-500/40 scale-105'
                                : 'bg-brand-silver-800/50 text-brand-silver-300 hover:bg-brand-silver-700 border border-brand-silver-700 hover:border-brand-purple-600/50'
                            }`}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    </div>
);

// ============ PASOS DEL FORMULARIO ============

const Step1_Personal = ({ formData, handleChange, errors }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <User size={20} className="text-brand-purple-400" /> Datos Personales
            </h3>
            <p className="text-brand-silver-400 text-sm">Información básica para tu perfil</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedInput id="name" label="Nombre Completo" type="text" value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)} error={errors.name}
                placeholder="Tu nombre completo" autoComplete="name" required />
            <ValidatedInput id="nickname" label="Apodo / Cómo te gustaría que te llame" type="text"
                value={formData.nickname} onChange={(e) => handleChange('nickname', e.target.value)}
                placeholder="Ej: Kev, Leo..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RangeInput id="age" label="Edad *" value={formData.age} min={16} max={80} unit="años"
                onChange={(v) => handleChange('age', v)} />
            <ValidatedSelect id="gender" label="Género" value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                options={['Hombre', 'Mujer', 'No binario', 'Prefiero no decir']} />
        </div>
        <ValidatedInput id="city" label="Ciudad / País" type="text" value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)} error={errors.city}
            placeholder="Ej: Bogotá, Colombia" required />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RangeInput id="height" label="Altura *" value={formData.height} min={140} max={220} unit="cm"
                onChange={(v) => handleChange('height', v)} />
            <RangeInput id="weight" label="Peso actual *" value={formData.weight} min={40} max={150} unit="kg"
                onChange={(v) => handleChange('weight', v)} />
            <ValidatedInput id="desiredWeight" label="Peso deseado (kg)" type="number"
                value={formData.desiredWeight} onChange={(e) => handleChange('desiredWeight', e.target.value)}
                placeholder="Ej: 75" />
        </div>
    </div>
);

const Step2_Contact = ({ formData, handleChange, errors }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Phone size={20} className="text-brand-purple-400" /> Contacto
            </h3>
            <p className="text-brand-silver-400 text-sm">¿Cómo podemos comunicarnos contigo?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedInput id="email" label="Email" type="email" value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)} error={errors.email}
                placeholder="tu@email.com" autoComplete="email" />
            <ValidatedInput id="phone" label="Teléfono / WhatsApp" type="tel" value={formData.phone}
                onChange={(e) => handleChange('phone', formatPhone(e.target.value))} error={errors.phone}
                placeholder="+57 300 123 4567" autoComplete="tel" required />
        </div>
        <ValidatedInput id="instagram" label="Instagram" type="text" value={formData.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)} placeholder="@tu_usuario" />
        <ValidatedSelect id="howFound" label="¿Cómo te enteraste de Kevin?" value={formData.howFound}
            onChange={(e) => handleChange('howFound', e.target.value)}
            options={['Instagram', 'Recomendación', 'YouTube', 'Google', 'Otro']} />
        <AnimatePresence>
            {formData.howFound === 'Otro' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <ValidatedInput id="howFoundOther" label="Especifica" type="text"
                        value={formData.howFoundOther} onChange={(e) => handleChange('howFoundOther', e.target.value)}
                        placeholder="¿Cómo nos encontraste?" />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const Step3_Health = ({ formData, handleChange, errors }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <HeartPulse size={20} className="text-brand-purple-400" /> Salud e Historial Médico
            </h3>
            <p className="text-brand-silver-400 text-sm">Tu salud es lo más importante</p>
        </div>
        <CheckboxGroup label="¿Tienes lesiones actuales o pasadas?" required
            options={['Hombros', 'Muñecas', 'Codos', 'Espalda baja', 'Rodillas', 'Tobillos', 'Cuello', 'Ninguna']}
            values={formData.injuries} onChange={(v) => handleChange('injuries', v)} />
        {errors.injuries && (
            <p className="text-red-400 text-xs flex items-center gap-1" role="alert">
                <AlertCircle size={12} /> {errors.injuries}
            </p>
        )}
        <AnimatePresence>
            {formData.injuries?.length > 0 && !formData.injuries.includes('Ninguna') && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <ValidatedTextarea id="injuryDetail" label="Detalle de lesiones"
                        value={formData.injuryDetail} onChange={(e) => handleChange('injuryDetail', e.target.value)}
                        placeholder="Describe tus lesiones con más detalle..." />
                </motion.div>
            )}
        </AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedSelect id="surgeries" label="¿Has tenido cirugías?" value={formData.surgeries}
                onChange={(e) => handleChange('surgeries', e.target.value)} options={['Sí', 'No']} />
            <AnimatePresence>
                {formData.surgeries === 'Sí' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                        <ValidatedTextarea id="surgeryDetail" label="Tipo y fecha de cirugía"
                            value={formData.surgeryDetail} onChange={(e) => handleChange('surgeryDetail', e.target.value)}
                            placeholder="Ej: Rodilla derecha, LCA - 2022" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        <CheckboxGroup label="Enfermedades crónicas"
            options={['Hipertensión', 'Diabetes', 'Asma', 'Tiroides', 'Problemas cardíacos', 'Ninguna', 'Otra']}
            values={formData.chronicDiseases} onChange={(v) => handleChange('chronicDiseases', v)} />
        <ValidatedTextarea id="medications" label="Medicamentos actuales"
            value={formData.medications} onChange={(e) => handleChange('medications', e.target.value)}
            placeholder="Lista tus medicamentos o escribe 'Ninguno'" />
        <ValidatedSelect id="substances" label="¿Fumas o bebes alcohol?" value={formData.substances}
            onChange={(e) => handleChange('substances', e.target.value)}
            options={['Nunca', 'Ocasionalmente', 'Frecuentemente']} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedSelect id="anxietyDepression" label="¿Tienes diagnóstico de ansiedad o depresión?"
                value={formData.anxietyDepression} onChange={(e) => handleChange('anxietyDepression', e.target.value)}
                options={['Sí', 'No']} />
            <AnimatePresence>
                {formData.anxietyDepression === 'Sí' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                        <RangeInput id="anxietyLevel" label="Nivel de ansiedad/depresión"
                            value={formData.anxietyLevel} min={1} max={10} unit="/ 10"
                            onChange={(v) => handleChange('anxietyLevel', v)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        <RangeInput id="stressLevel" label="Nivel de estrés diario" value={formData.stressLevel}
            min={1} max={10} unit="/ 10" onChange={(v) => handleChange('stressLevel', v)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedInput id="sleepHours" label="Horas de sueño promedio" type="number"
                value={formData.sleepHours} onChange={(e) => handleChange('sleepHours', e.target.value)}
                placeholder="Ej: 7" />
            <RangeInput id="sleepQuality" label="Calidad del sueño" value={formData.sleepQuality}
                min={1} max={10} unit="/ 10" onChange={(v) => handleChange('sleepQuality', v)} />
        </div>
    </div>
);

const Step4_Training = ({ formData, handleChange, errors }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Dumbbell size={20} className="text-brand-purple-400" /> Nivel Actual de Entrenamiento
            </h3>
            <p className="text-brand-silver-400 text-sm">Tu experiencia previa en entrenamiento</p>
        </div>
        <ValidatedSelect id="trainingDuration" label="¿Cuánto tiempo llevas entrenando?"
            value={formData.trainingDuration} onChange={(e) => handleChange('trainingDuration', e.target.value)}
            options={['Nunca', 'Menos de 6 meses', '6 meses - 1 año', '1-3 años', 'Más de 3 años']} />
        <ValidatedSelect id="experience" label="Nivel actual" value={formData.experience}
            onChange={(e) => handleChange('experience', e.target.value)} error={errors.experience}
            options={['Principiante', 'Intermedio', 'Avanzado']} required />
        <CheckboxGroup label="Tipo de entrenamiento previo"
            options={['Gym tradicional', 'Calistenia', 'Crossfit', 'Yoga', 'Running', 'Ninguno', 'Otro']}
            values={formData.previousTraining} onChange={(v) => handleChange('previousTraining', v)} />
        <ValidatedSelect id="currentlyTraining" label="¿Entrenas actualmente?"
            value={formData.currentlyTraining} onChange={(e) => handleChange('currentlyTraining', e.target.value)}
            options={['Sí', 'No']} />
        <AnimatePresence>
            {formData.currentlyTraining === 'Sí' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidatedInput id="trainingFrequency" label="Frecuencia semanal" type="number"
                        value={formData.trainingFrequency} onChange={(e) => handleChange('trainingFrequency', e.target.value)}
                        placeholder="Ej: 4" />
                    <ValidatedInput id="trainingHours" label="Horas por sesión" type="number"
                        value={formData.trainingHours} onChange={(e) => handleChange('trainingHours', e.target.value)}
                        placeholder="Ej: 1.5" />
                </motion.div>
            )}
        </AnimatePresence>
        <CheckboxGroup label="¿Tienes equipo en casa?"
            options={['Barra de dominadas', 'Paralelas', 'Anillas', 'Mancuernas', 'Ninguno']}
            values={formData.homeEquipment} onChange={(v) => handleChange('homeEquipment', v)} />
        <CheckboxGroup label="Habilidades actuales"
            options={['Dominadas', 'Flexiones', 'Fondos', 'Muscle-up', 'Handstand', 'Front lever', 'Ninguna aún']}
            values={formData.currentSkills} onChange={(v) => handleChange('currentSkills', v)} />
    </div>
);

const Step5_Goals = ({ formData, handleChange, errors }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Target size={20} className="text-brand-purple-400" /> Objetivos
            </h3>
            <p className="text-brand-silver-400 text-sm">Define hacia dónde quieres llegar</p>
        </div>
        <ValidatedSelect id="packageInterest" label="Paquete de interés" value={formData.packageInterest}
            onChange={(e) => handleChange('packageInterest', e.target.value)} error={errors.packageInterest}
            options={[
                'Básico 3 meses $300.000',
                'Avanzado 6 meses $250.000',
                'Avanzado + Nutrición $350.000',
                'Solo asesoría nutricional $25.000/hora'
            ]} required />
        <ValidatedSelect id="trainingType" label="Tipo de entrenamiento preferido" value={formData.trainingType}
            onChange={(e) => handleChange('trainingType', e.target.value)} error={errors.trainingType}
            options={['Calistenia pura', 'Calistenia híbrida', 'Gym tradicional', 'No sé aún']} required />
        <ValidatedSelect id="modality" label="Modalidad preferida" value={formData.modality}
            onChange={(e) => handleChange('modality', e.target.value)}
            options={['Online', 'Presencial', 'Híbrido']} />
        <CheckboxGroup label="Objetivos principales"
            options={['Bajar grasa', 'Ganar músculo', 'Fuerza máxima', 'Movilidad', 'Habilidades calistenia', 'Bienestar general']}
            values={formData.mainGoals} onChange={(v) => handleChange('mainGoals', v)} />
        <ValidatedTextarea id="goal" label="Objetivo detallado" value={formData.goal}
            onChange={(e) => handleChange('goal', e.target.value)}
            placeholder="Describe con detalle qué quieres lograr..." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedTextarea id="goal3months" label="Meta a 3 meses" value={formData.goal3months}
                onChange={(e) => handleChange('goal3months', e.target.value)}
                placeholder="¿Qué esperas lograr en 3 meses?" />
            <ValidatedTextarea id="goal6months" label="Meta a 6 meses" value={formData.goal6months}
                onChange={(e) => handleChange('goal6months', e.target.value)}
                placeholder="¿Y en 6 meses?" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RangeInput id="availableDays" label="Días disponibles por semana" value={formData.availableDays}
                min={1} max={7} unit="días" onChange={(v) => handleChange('availableDays', v)} />
            <ValidatedSelect id="preferredSchedule" label="Horario preferido" value={formData.preferredSchedule}
                onChange={(e) => handleChange('preferredSchedule', e.target.value)}
                options={['Mañana', 'Tarde', 'Noche', 'Flexible']} />
        </div>
    </div>
);

const Step6_Lifestyle = ({ formData, handleChange }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Apple size={20} className="text-brand-purple-400" /> Hábitos y Estilo de Vida
            </h3>
            <p className="text-brand-silver-400 text-sm">Tus hábitos diarios importan tanto como tu entrenamiento</p>
        </div>
        <ValidatedSelect id="dietType" label="Dieta actual" value={formData.dietType}
            onChange={(e) => handleChange('dietType', e.target.value)}
            options={['Omnívora', 'Vegetariana', 'Vegana', 'Keto', 'Ayuno intermitente', 'Otra']} />
        <ValidatedSelect id="proteinConsumption" label="¿Consumes suficiente proteína?"
            value={formData.proteinConsumption} onChange={(e) => handleChange('proteinConsumption', e.target.value)}
            options={['Sí', 'No', 'No sé']} />
        <RangeInput id="disciplineLevel" label="Nivel de disciplina actual" value={formData.disciplineLevel}
            min={1} max={10} unit="/ 10" onChange={(v) => handleChange('disciplineLevel', v)} />
        <ValidatedTextarea id="limitingHabits" label="3 hábitos que te limitan actualmente"
            value={formData.limitingHabits} onChange={(e) => handleChange('limitingHabits', e.target.value)}
            placeholder="Ej: Comer por ansiedad, no dormir bien, falta de constancia..." />
        <ValidatedTextarea id="desiredHabits" label="3 hábitos que quieres construir"
            value={formData.desiredHabits} onChange={(e) => handleChange('desiredHabits', e.target.value)}
            placeholder="Ej: Entrenar 4 veces por semana, comer balanceado, dormir 8 horas..." />
        <RangeInput id="commitmentLevel" label="Nivel de compromiso con el proceso" value={formData.commitmentLevel}
            min={1} max={10} unit="/ 10" onChange={(v) => handleChange('commitmentLevel', v)} />
    </div>
);

const Step7_Consent = ({ formData, handleChange, errors }) => (
    <div className="space-y-6">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <FileCheck size={20} className="text-brand-purple-400" /> Consentimiento y Envío
            </h3>
            <p className="text-brand-silver-400 text-sm">Último paso — ¡ya casi!</p>
        </div>
        <ValidatedTextarea id="whyKevin" label="¿Por qué decidiste contactar a Kevin?"
            value={formData.whyKevin} onChange={(e) => handleChange('whyKevin', e.target.value)}
            placeholder="Cuéntanos qué te motivó a dar este paso..." />
        <ValidatedInput id="desiredStartDate" label="Fecha de inicio deseada" type="date"
            value={formData.desiredStartDate} onChange={(e) => handleChange('desiredStartDate', e.target.value)} />
        <div className="space-y-4 bg-gradient-to-br from-brand-purple-900/10 to-brand-purple-800/5 border border-brand-purple-600/30 p-5 rounded-xl">
            <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={formData.consentData || false}
                    onChange={(e) => handleChange('consentData', e.target.checked)}
                    className="mt-1 accent-brand-purple-500 w-5 h-5" />
                <span className="text-brand-silver-300 text-sm group-hover:text-white transition-colors">
                    Acepto que mis datos se usen para crear mi programa personalizado <span className="text-brand-neon-green-neon">*</span>
                </span>
            </label>
            {errors.consentData && (
                <p className="text-red-400 text-xs flex items-center gap-1 ml-8" role="alert">
                    <AlertCircle size={12} /> {errors.consentData}
                </p>
            )}
            <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={formData.consentContent || false}
                    onChange={(e) => handleChange('consentContent', e.target.checked)}
                    className="mt-1 accent-brand-purple-500 w-5 h-5" />
                <span className="text-brand-silver-300 text-sm group-hover:text-white transition-colors">
                    Acepto recibir contenido de motivación y seguimiento
                </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={formData.consentProgress || false}
                    onChange={(e) => handleChange('consentProgress', e.target.checked)}
                    className="mt-1 accent-brand-purple-500 w-5 h-5" />
                <span className="text-brand-silver-300 text-sm group-hover:text-white transition-colors">
                    Acepto que mi progreso (anónimo) pueda inspirar a otros
                </span>
            </label>
        </div>
    </div>
);

// ============ COMPONENTE PRINCIPAL ============

const Anamnesis = ({ handleWhatsAppClick }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    const topRef = useRef(null);
    const justAdvancedRef = useRef(false);

    const [formData, setFormData] = useState({
        // Step 1 — Datos Personales
        name: '', nickname: '', age: 25, gender: '', city: '',
        height: 170, weight: 70, desiredWeight: '',
        // Step 2 — Contacto
        email: '', phone: '', instagram: '', howFound: '', howFoundOther: '',
        // Step 3 — Salud
        injuries: [], injuryDetail: '', surgeries: '', surgeryDetail: '',
        chronicDiseases: [], medications: '', substances: '',
        anxietyDepression: '', anxietyLevel: 5, stressLevel: 5,
        sleepHours: '', sleepQuality: 5,
        // Step 4 — Entrenamiento
        trainingDuration: '', experience: '', previousTraining: [],
        currentlyTraining: '', trainingFrequency: '', trainingHours: '',
        homeEquipment: [], currentSkills: [],
        // Step 5 — Objetivos
        packageInterest: '', trainingType: '', modality: '',
        mainGoals: [], goal: '', goal3months: '', goal6months: '',
        availableDays: 4, preferredSchedule: '',
        // Step 6 — Estilo de Vida
        dietType: '', proteinConsumption: '', disciplineLevel: 5,
        limitingHabits: '', desiredHabits: '', commitmentLevel: 7,
        // Step 7 — Consentimiento
        whyKevin: '', desiredStartDate: '',
        consentData: false, consentContent: false, consentProgress: false,
    });

    const steps = useMemo(() => [
        { title: 'Personal', icon: User, description: 'Datos personales' },
        { title: 'Contacto', icon: Phone, description: 'Información de contacto' },
        { title: 'Salud', icon: HeartPulse, description: 'Historial médico' },
        { title: 'Entreno', icon: Dumbbell, description: 'Nivel de entrenamiento' },
        { title: 'Objetivos', icon: Target, description: 'Tus metas' },
        { title: 'Hábitos', icon: Apple, description: 'Estilo de vida' },
        { title: 'Envío', icon: FileCheck, description: 'Consentimiento' },
    ], []);

    useEffect(() => {
        const timer = setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
    }, [currentStep]);

    const handleChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    }, [errors]);

    const validateStep = useCallback((step) => {
        const newErrors = {};
        switch (step) {
            case 0:
                if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
                else if (formData.name.trim().length < 3) newErrors.name = 'Mínimo 3 caracteres';
                if (!formData.city?.trim()) newErrors.city = 'La ciudad es requerida';
                break;
            case 1:
                if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
                else if (!validatePhone(formData.phone)) newErrors.phone = 'Formato inválido (mínimo 10 dígitos)';
                if (formData.email && !validateEmail(formData.email)) newErrors.email = 'Formato de email inválido';
                break;
            case 2:
                if (!formData.injuries?.length) newErrors.injuries = 'Selecciona al menos una opción';
                break;
            case 3:
                if (!formData.experience) newErrors.experience = 'Selecciona tu nivel actual';
                break;
            case 4:
                if (!formData.packageInterest) newErrors.packageInterest = 'Selecciona un paquete';
                if (!formData.trainingType) newErrors.trainingType = 'Selecciona un tipo de entrenamiento';
                break;
            case 5:
                // No required fields in lifestyle
                break;
            case 6:
                if (!formData.consentData) newErrors.consentData = 'Debes aceptar el uso de tus datos';
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const nextStep = useCallback(() => {
        if (validateStep(currentStep) && currentStep < steps.length - 1) {
            justAdvancedRef.current = true;
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, steps.length, validateStep]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setErrors({});
        }
    }, [currentStep]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (justAdvancedRef.current) { justAdvancedRef.current = false; return; }
        if (currentStep < steps.length - 1) { nextStep(); return; }
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || '/api';
            const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, '');
            const payload = {
                ...formData,
                age: Number(formData.age),
                weight: Number(formData.weight),
                height: Number(formData.height),
                desiredWeight: formData.desiredWeight ? Number(formData.desiredWeight) : null,
                sleepHours: formData.sleepHours ? Number(formData.sleepHours) : null,
                trainingFrequency: formData.trainingFrequency ? Number(formData.trainingFrequency) : null,
                trainingHours: formData.trainingHours ? Number(formData.trainingHours) : null,
                stressLevel: Number(formData.stressLevel),
                sleepQuality: Number(formData.sleepQuality),
                anxietyLevel: formData.anxietyDepression === 'Sí' ? Number(formData.anxietyLevel) : null,
                disciplineLevel: Number(formData.disciplineLevel),
                commitmentLevel: Number(formData.commitmentLevel),
                availableDays: Number(formData.availableDays),
                submittedAt: new Date().toISOString()
            };

            const res = await fetch(`${normalizedBaseUrl}/anamnesis`, {
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
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
            if (e.key === 'ArrowRight' && currentStep < steps.length - 1) { e.preventDefault(); nextStep(); }
            else if (e.key === 'ArrowLeft' && currentStep > 0) { e.preventDefault(); prevStep(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentStep, steps.length, nextStep, prevStep]);

    // ============ PANTALLA DE ÉXITO ============
    if (submitStatus === 'success') {
        return (
            <section className="py-24 px-4 min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-brand-silver-900 to-brand-silver-800">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-lg mx-auto">
                    <div className="w-24 h-24 bg-brand-neon-green-neon/20 border-2 border-brand-neon-green-neon rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-brand-neon-green-neon" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 to-brand-neon-green-neon">
                            ¡Gracias por tu confianza!
                        </span>
                    </h2>
                    <p className="text-brand-silver-300 mb-4 text-lg">
                        Gracias, <span className="text-brand-neon-green-neon font-semibold">{formData.name}</span>.
                        Tu información ha sido enviada exitosamente.
                    </p>
                    <p className="text-brand-silver-400 mb-8 text-base italic">
                        Kevin te contactará pronto por WhatsApp para comenzar tu transformación.
                    </p>
                    <motion.button
                        onClick={handleWhatsAppClick}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400 text-brand-silver-900 font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-neon-green-neon/30 mx-auto"
                    >
                        <Send size={20} /> Contactar por WhatsApp
                    </motion.button>
                </motion.div>
            </section>
        );
    }

    // ============ RENDER PRINCIPAL ============
    return (
        <section ref={topRef} id="anamnesis"
            className="py-20 px-4 bg-gradient-to-b from-brand-silver-900 to-brand-silver-800 relative min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-silver-900 via-brand-silver-800 to-brand-silver-900" />
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-purple-900/10 to-transparent" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-neon-green-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-30" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-brand-purple-900/30 border border-brand-purple-500/30 text-brand-purple-300 text-sm font-medium mb-4">
                        Formulario de Anamnesis
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                            Tu Perfil Personalizado
                        </span>
                    </h2>
                    <p className="text-brand-silver-400">Paso {currentStep + 1} de {steps.length}</p>
                </div>

                {/* Progress Stepper */}
                <div className="mb-8 relative" aria-label="Progreso del formulario">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-silver-800 -z-10 rounded-full" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-brand-purple-600 via-brand-neon-green-neon to-brand-purple-600 -z-10 rounded-full transition-all duration-500"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={steps.length}
                    />
                    <div className="flex justify-between items-center relative">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const isActive = idx <= currentStep;
                            const isCurrent = idx === currentStep;
                            return (
                                <div key={idx} className="flex flex-col items-center gap-1 bg-transparent px-1 relative z-10">
                                    <motion.button type="button"
                                        onClick={() => idx < currentStep && setCurrentStep(idx)}
                                        disabled={idx > currentStep}
                                        aria-label={`${step.title}: ${step.description}`}
                                        aria-current={isCurrent ? 'step' : undefined}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCurrent
                                            ? 'border-brand-neon-green-neon bg-brand-neon-green-neon/20 text-brand-neon-green-neon shadow-lg shadow-brand-neon-green-neon/30'
                                            : isActive
                                                ? 'border-brand-purple-500 bg-brand-purple-900/20 text-brand-purple-400 cursor-pointer hover:scale-110'
                                                : 'border-brand-silver-700 bg-brand-silver-900 text-brand-silver-600 cursor-not-allowed'
                                        }`}
                                        animate={{ scale: isCurrent ? 1.1 : 1 }}
                                    >
                                        <Icon size={18} />
                                    </motion.button>
                                    <span className={`text-[10px] md:text-xs font-medium transition-colors text-center max-w-[60px] md:max-w-[80px] hidden sm:block ${isCurrent ? 'text-brand-neon-green-neon' :
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
                        <div className="min-h-[450px]">
                            <AnimatePresence mode="wait">
                                <motion.div key={currentStep}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                    {currentStep === 0 && <Step1_Personal formData={formData} handleChange={handleChange} errors={errors} />}
                                    {currentStep === 1 && <Step2_Contact formData={formData} handleChange={handleChange} errors={errors} />}
                                    {currentStep === 2 && <Step3_Health formData={formData} handleChange={handleChange} errors={errors} />}
                                    {currentStep === 3 && <Step4_Training formData={formData} handleChange={handleChange} errors={errors} />}
                                    {currentStep === 4 && <Step5_Goals formData={formData} handleChange={handleChange} errors={errors} />}
                                    {currentStep === 5 && <Step6_Lifestyle formData={formData} handleChange={handleChange} />}
                                    {currentStep === 6 && <Step7_Consent formData={formData} handleChange={handleChange} errors={errors} />}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Error message */}
                        <AnimatePresence>
                            {submitStatus === 'error' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-4 p-4 bg-red-900/20 border border-red-900/30 rounded-lg text-red-400 text-sm flex items-center gap-2"
                                    role="alert">
                                    <AlertCircle size={16} />
                                    Error al enviar. Intenta nuevamente o contacta por WhatsApp.
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation buttons */}
                        <div className="mt-8 flex justify-between items-center pt-6 border-t border-brand-silver-700">
                            <motion.button type="button" onClick={prevStep} disabled={currentStep === 0}
                                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                                whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                                className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-all ${currentStep === 0
                                    ? 'opacity-0 pointer-events-none'
                                    : 'text-brand-silver-400 hover:text-white hover:bg-brand-silver-800/50'
                                }`} aria-label="Paso anterior">
                                <ChevronLeft size={20} /> Anterior
                            </motion.button>

                            {currentStep === steps.length - 1 ? (
                                <motion.button key="submit-btn" type="submit" disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                                    className="bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-400 text-brand-silver-900 px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-neon-green-neon/30 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Enviar formulario">
                                    {isSubmitting ? (
                                        <><div className="w-4 h-4 border-2 border-brand-silver-900/30 border-t-brand-silver-900 rounded-full animate-spin" /> Enviando...</>
                                    ) : (
                                        <>Finalizar <Send size={18} /></>
                                    )}
                                </motion.button>
                            ) : (
                                <motion.button key="next-btn" type="button" onClick={nextStep}
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-brand-silver-200 to-white text-brand-silver-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-all shadow-lg"
                                    aria-label="Siguiente paso">
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
