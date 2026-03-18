// src/controllers/anamnesisController.js
const db = require('../db');

// ============ EMAIL HELPER ============

/**
 * Envía email de notificación a Kevin con resumen de anamnesis.
 * Usa try/catch independiente: si falla el email, NO falla el guardado en DB.
 */
const sendNotificationEmail = async (data) => {
    try {
        // Solo intentar si las variables de entorno están configuradas
        const { MAIL_USER, MAIL_PASS, MAIL_TO } = process.env;
        if (!MAIL_USER || !MAIL_PASS || !MAIL_TO) {
            console.log('Email no configurado (MAIL_USER/MAIL_PASS/MAIL_TO). Saltando notificación.');
            return;
        }

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: MAIL_USER, pass: MAIL_PASS },
        });

        const injuries = Array.isArray(data.injuries) ? data.injuries.join(', ') : data.injuries;
        const mainGoals = Array.isArray(data.mainGoals) ? data.mainGoals.join(', ') : data.mainGoals;

        const htmlBody = `
            <h2>🏋️ Nueva Anamnesis Recibida</h2>
            <hr />
            <h3>Datos Personales</h3>
            <ul>
                <li><strong>Nombre:</strong> ${data.name || '-'}</li>
                <li><strong>Apodo:</strong> ${data.nickname || '-'}</li>
                <li><strong>Edad:</strong> ${data.age || '-'}</li>
                <li><strong>Género:</strong> ${data.gender || '-'}</li>
                <li><strong>Ciudad:</strong> ${data.city || '-'}</li>
                <li><strong>Altura:</strong> ${data.height || '-'} cm</li>
                <li><strong>Peso actual:</strong> ${data.weight || '-'} kg</li>
                <li><strong>Peso deseado:</strong> ${data.desiredWeight || '-'} kg</li>
            </ul>
            <h3>Contacto</h3>
            <ul>
                <li><strong>Teléfono:</strong> ${data.phone || '-'}</li>
                <li><strong>Email:</strong> ${data.email || '-'}</li>
                <li><strong>Instagram:</strong> ${data.instagram || '-'}</li>
                <li><strong>Cómo se enteró:</strong> ${data.howFound || '-'}</li>
            </ul>
            <h3>Salud</h3>
            <ul>
                <li><strong>Lesiones:</strong> ${injuries || '-'}</li>
                <li><strong>Cirugías:</strong> ${data.surgeries || '-'}</li>
                <li><strong>Estrés:</strong> ${data.stressLevel || '-'}/10</li>
                <li><strong>Sueño:</strong> ${data.sleepHours || '-'} hrs</li>
            </ul>
            <h3>Objetivos</h3>
            <ul>
                <li><strong>Paquete:</strong> ${data.packageInterest || '-'}</li>
                <li><strong>Tipo entrenamiento:</strong> ${data.trainingType || '-'}</li>
                <li><strong>Modalidad:</strong> ${data.modality || '-'}</li>
                <li><strong>Objetivos:</strong> ${mainGoals || '-'}</li>
                <li><strong>Nivel:</strong> ${data.experience || '-'}</li>
            </ul>
            <h3>Compromiso</h3>
            <ul>
                <li><strong>Disciplina:</strong> ${data.disciplineLevel || '-'}/10</li>
                <li><strong>Compromiso:</strong> ${data.commitmentLevel || '-'}/10</li>
                <li><strong>Por qué Kevin:</strong> ${data.whyKevin || '-'}</li>
                <li><strong>Inicio deseado:</strong> ${data.desiredStartDate || '-'}</li>
            </ul>
            <hr />
            <p><em>Enviado desde el formulario de anamnesis de Kevin Leandro Fitness</em></p>
        `;

        await transporter.sendMail({
            from: `"Kevin Leandro Fitness" <${MAIL_USER}>`,
            to: MAIL_TO,
            subject: `🏋️ Nueva Anamnesis: ${data.name} — ${data.packageInterest || 'Sin paquete'}`,
            html: htmlBody,
        });

        console.log('Email de notificación enviado exitosamente');
    } catch (emailError) {
        // Si el email falla, solo log — NO debe fallar el guardado en DB
        console.error('Error enviando email de notificación (no afecta guardado en DB):', emailError.message);
    }
};

// ============ CONTROLADORES ============

exports.submitAnamnesis = async (req, res) => {
    const client = await db.connect();
    try {
        const d = req.body;

        // Validación de campos requeridos (originales + nuevos)
        const reqFields = ['name', 'phone', 'age', 'weight', 'height'];
        const miss = reqFields.filter((f) => {
            const value = d[f];
            if (value === null || value === undefined || value === '') return true;
            if (typeof value === 'string' && !value.trim()) return true;
            return false;
        });
        if (miss.length) return res.status(400).json({ message: 'Campos faltantes', missingFields: miss });

        // Validar campos requeridos del nuevo formulario
        if (!d.packageInterest?.trim()) {
            return res.status(400).json({ message: 'Campos faltantes', missingFields: ['packageInterest'] });
        }
        if (!d.trainingType?.trim()) {
            return res.status(400).json({ message: 'Campos faltantes', missingFields: ['trainingType'] });
        }

        // Validación de rangos numéricos
        const numFields = {
            age: [16, 80], weight: [40, 300], height: [100, 250],
        };
        for (const [f, [min, max]] of Object.entries(numFields)) {
            if (d[f] != null && d[f] !== '') {
                const v = +d[f];
                if (isNaN(v) || v < min || v > max)
                    return res.status(400).json({ message: `Valor inválido para ${f}`, field: f, value: d[f], expectedRange: `${min}-${max}` });
            }
        }

        // Preparar injuries para la DB (puede ser array o texto)
        const injuriesValue = Array.isArray(d.injuries) ? d.injuries.join(', ') : (d.injuries?.trim() || 'Ninguna');
        const experience = d.experience || 'intermediate';
        // Map experience to DB constraint values
        const experienceMap = {
            'Principiante': 'beginner', 'Intermedio': 'intermediate', 'Avanzado': 'advanced',
            'beginner': 'beginner', 'intermediate': 'intermediate', 'advanced': 'advanced',
        };
        const mappedExperience = experienceMap[experience] || 'intermediate';

        await client.query('BEGIN');

        const vals = [
            // Original fields (1-26)
            d.name?.trim(),                                          // $1
            +d.age || null,                                          // $2
            +d.weight || null,                                       // $3
            +d.height || null,                                       // $4
            d.phone?.trim(),                                         // $5
            d.email?.trim() || null,                                 // $6
            d.sport?.trim() || null,                                 // $7
            d.position?.trim() || null,                              // $8
            d.level || null,                                         // $9
            d.dominance || null,                                     // $10
            mappedExperience,                                        // $11
            d.goal?.trim() || null,                                  // $12
            d.painLocation?.trim() || null,                          // $13
            +d.painLevel || 0,                                       // $14
            d.painType || null,                                      // $15
            d.trainingFrequency != null ? +d.trainingFrequency : null, // $16
            d.trainingHours != null ? +d.trainingHours : null,       // $17
            !!d.recentChanges,                                       // $18
            injuriesValue,                                           // $19
            d.sleepHours != null ? +d.sleepHours : null,             // $20
            d.stressLevel != null ? String(d.stressLevel) : 'Medio', // $21
            d.packageInterest?.trim() || null,                       // $22
            d.trainingType?.trim() || null,                          // $23
            d.submittedAt || new Date().toISOString(),                // $24
            req.ip || req.connection?.remoteAddress || null,          // $25
            req.get('user-agent') || null,                           // $26
            // New fields (27-56)
            d.nickname?.trim() || null,                              // $27
            d.gender || null,                                        // $28
            d.city?.trim() || null,                                  // $29
            d.desiredWeight != null && d.desiredWeight !== '' ? +d.desiredWeight : null, // $30
            d.howFound || null,                                      // $31
            d.howFoundOther?.trim() || null,                         // $32
            d.instagram?.trim() || null,                             // $33
            d.injuryDetail?.trim() || null,                          // $34
            d.surgeries || null,                                     // $35
            d.surgeryDetail?.trim() || null,                         // $36
            Array.isArray(d.chronicDiseases) ? d.chronicDiseases : null, // $37
            d.medications?.trim() || null,                           // $38
            d.substances || null,                                    // $39
            d.anxietyDepression || null,                             // $40
            d.anxietyLevel != null ? +d.anxietyLevel : null,         // $41
            d.sleepQuality != null ? +d.sleepQuality : null,         // $42
            d.trainingDuration || null,                              // $43
            Array.isArray(d.previousTraining) ? d.previousTraining : null, // $44
            d.currentlyTraining || null,                             // $45
            Array.isArray(d.homeEquipment) ? d.homeEquipment : null, // $46
            Array.isArray(d.currentSkills) ? d.currentSkills : null, // $47
            d.modality || null,                                      // $48
            Array.isArray(d.mainGoals) ? d.mainGoals : null,         // $49
            d.goal3months?.trim() || null,                           // $50
            d.goal6months?.trim() || null,                           // $51
            d.availableDays != null ? +d.availableDays : null,       // $52
            d.preferredSchedule || null,                             // $53
            d.dietType || null,                                      // $54
            d.proteinConsumption || null,                            // $55 (stored in stress_level or separate?)
            d.disciplineLevel != null ? +d.disciplineLevel : null,   // $56
            d.limitingHabits?.trim() || null,                        // $57
            d.desiredHabits?.trim() || null,                         // $58
            d.commitmentLevel != null ? +d.commitmentLevel : null,   // $59
            d.whyKevin?.trim() || null,                              // $60
            d.desiredStartDate || null,                              // $61
            !!d.consentData,                                         // $62
            !!d.consentContent,                                      // $63
            !!d.consentProgress,                                     // $64
        ];

        const q = `
            INSERT INTO anamnesis (
                name, age, weight, height, phone, email,
                sport, position, level, dominance, experience,
                goal, pain_location, pain_level, pain_type,
                training_frequency, training_hours, recent_changes,
                injuries, sleep_hours, stress_level,
                package_interest, training_type,
                submitted_at, ip_address, user_agent,
                nickname, gender, city, desired_weight,
                how_found, how_found_other, instagram,
                injury_detail, surgeries, surgery_detail,
                chronic_diseases, medications, substances,
                anxiety_depression, anxiety_level, sleep_quality,
                training_duration, previous_training, currently_training,
                home_equipment, current_skills,
                modality, main_goals, goal_3months, goal_6months,
                available_days, preferred_schedule,
                diet_type, protein_consumption, discipline_level,
                limiting_habits, desired_habits, commitment_level,
                why_kevin, desired_start_date,
                consent_data, consent_content, consent_progress
            ) VALUES (${Array.from({ length: 64 }, (_, i) => `$${i + 1}`).join(',')})
            RETURNING id, submitted_at
        `;

        const r = await client.query(q, vals);
        await client.query('COMMIT');

        const { id, submitted_at } = r.rows[0];
        console.log('Anamnesis guardada:', { id, name: d.name, package: d.packageInterest, submittedAt: submitted_at });
        
        // Enviar email de notificación (independiente del guardado en DB)
        sendNotificationEmail(d);

        res.status(201).json({
            message: 'Anamnesis guardada exitosamente',
            success: true,
            data: { id, submittedAt: submitted_at }
        });

    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Error guardando anamnesis:', e);
        if (e.code === '23505')
            return res.status(409).json({ message: 'Registro duplicado', error: process.env.NODE_ENV === 'development' ? e.message : undefined });
        if (e.code === '23502')
            return res.status(400).json({ message: 'Falta un campo obligatorio para guardar la anamnesis', error: process.env.NODE_ENV === 'development' ? e.message : undefined });
        if (e.code === '23514')
            return res.status(400).json({ message: 'Uno o más valores no cumplen las reglas del formulario', error: process.env.NODE_ENV === 'development' ? e.message : undefined });
        res.status(500).json({ message: 'Error interno del servidor', error: process.env.NODE_ENV === 'development' ? e.message : undefined });
    } finally {
        client.release();
    }
};

exports.listAnamnesis = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT
                id, name, phone, email, age, weight, height,
                sport, position, level, dominance, experience,
                goal, injuries, pain_location, pain_level, pain_type,
                training_frequency, training_hours, recent_changes,
                sleep_hours, stress_level, package_interest, training_type,
                nickname, gender, city, desired_weight,
                how_found, instagram,
                injury_detail, surgeries, surgery_detail,
                chronic_diseases, medications, substances,
                anxiety_depression, anxiety_level, sleep_quality,
                training_duration, previous_training, currently_training,
                home_equipment, current_skills,
                modality, main_goals, goal_3months, goal_6months,
                available_days, preferred_schedule,
                diet_type, discipline_level, limiting_habits, desired_habits,
                commitment_level, why_kevin, desired_start_date,
                consent_data, consent_content, consent_progress,
                submitted_at, created_at
            FROM anamnesis
            ORDER BY created_at DESC
            LIMIT 100
        `);

        return res.status(200).json({
            success: true,
            count: result.rowCount,
            data: result.rows,
        });
    } catch (e) {
        console.error('Error listando anamnesis:', e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};