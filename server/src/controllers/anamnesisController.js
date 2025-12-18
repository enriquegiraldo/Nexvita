/**
 * Controlador para manejar el envío de anamnesis atlética profesional
 * Recibe datos completos del formulario multi-paso y los valida
 */
exports.submitAnamnesis = (req, res) => {
    try {
        const data = req.body;
        
        // Validación básica de campos obligatorios
        const requiredFields = ['name', 'phone', 'sport', 'goal'];
        const missingFields = requiredFields.filter(field => !data[field] || (typeof data[field] === 'string' && data[field].trim().length === 0));
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: 'Campos obligatorios faltantes',
                missingFields: missingFields
            });
        }

        // Validación de tipos de datos numéricos
        const numericFields = {
            age: { min: 16, max: 80 },
            weight: { min: 40, max: 150 },
            height: { min: 140, max: 220 },
            painLevel: { min: 0, max: 10 },
            trainingFrequency: { min: 0, max: 14 },
            trainingHours: { min: 0.5, max: 5 },
            sleepHours: { min: 3, max: 12 }
        };

        for (const [field, range] of Object.entries(numericFields)) {
            if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
                const value = Number(data[field]);
                if (isNaN(value) || value < range.min || value > range.max) {
                    return res.status(400).json({
                        message: `Valor inválido para ${field}`,
                        field: field,
                        value: data[field],
                        expectedRange: `${range.min}-${range.max}`
                    });
                }
            }
        }

        // Preparar datos para almacenamiento
        const anamnesisData = {
            // Datos Personales
            personal: {
                name: data.name.trim(),
                age: Number(data.age) || null,
                weight: Number(data.weight) || null,
                height: Number(data.height) || null,
                phone: data.phone.trim(),
                email: data.email?.trim() || null
            },
            
            // Contexto Deportivo
            sport: {
                sport: data.sport.trim(),
                position: data.position?.trim() || null,
                level: data.level || 'Amateur',
                dominance: data.dominance || 'Diestro',
                experience: data.experience || 'intermediate'
            },
            
            // Objetivo y Dolor
            goals: {
                goal: data.goal.trim(),
                painLocation: data.painLocation?.trim() || null,
                painLevel: Number(data.painLevel) || 0,
                painType: data.painType || null
            },
            
            // Carga de Entrenamiento
            training: {
                frequency: Number(data.trainingFrequency) || 0,
                hoursPerSession: Number(data.trainingHours) || 0,
                recentChanges: Boolean(data.recentChanges)
            },
            
            // Salud y Estilo de Vida
            health: {
                injuries: data.injuries?.trim() || null,
                sleepHours: Number(data.sleepHours) || null,
                stressLevel: data.stressLevel || 'Medio'
            },
            
            // Metadatos
            metadata: {
                submittedAt: data.submittedAt || new Date().toISOString(),
                ip: req.ip || req.connection.remoteAddress,
                userAgent: req.get('user-agent') || null
            }
        };

        console.log('Anamnesis atlética recibida:', {
            name: anamnesisData.personal.name,
            sport: anamnesisData.sport.sport,
            level: anamnesisData.sport.level,
            submittedAt: anamnesisData.metadata.submittedAt
        });

        // TODO: Aquí guardarías en la base de datos
        // Ejemplo con MongoDB:
        // await AnamnesisModel.create(anamnesisData);
        
        // Ejemplo con Firebase:
        // await db.collection('anamnesis').add(anamnesisData);

        res.status(201).json({
            message: 'Anamnesis atlética enviada exitosamente',
            success: true,
            data: {
                id: `anamnesis_${Date.now()}`, // ID temporal, reemplazar con ID real de BD
                submittedAt: anamnesisData.metadata.submittedAt
            }
        });
    } catch (error) {
        console.error('Error submitting anamnesis:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
