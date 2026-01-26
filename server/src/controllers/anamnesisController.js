const db = require('../db'); 
 
 exports.submitAnamnesis = async (req, res) => { 
     const client = await db.connect(); 
     try { 
         const d = req.body; 
         const reqFields = ['name', 'phone', 'sport', 'goal']; 
         const miss = reqFields.filter(f => !d[f] || (typeof d[f] === 'string' && !d[f].trim())); 
         if (miss.length) return res.status(400).json({ message: 'Campos faltantes', missingFields: miss }); 
 
         const numFields = { 
             age: [16, 80], weight: [40, 150], height: [140, 220], 
             painLevel: [0, 10], trainingFrequency: [0, 14], 
             trainingHours: [0.5, 5], sleepHours: [3, 12] 
         }; 
         for (const [f, [min, max]] of Object.entries(numFields)) { 
             if (d[f] != null && d[f] !== '') { 
                 const v = +d[f]; 
                 if (isNaN(v) || v < min || v > max) 
                     return res.status(400).json({ message: `Valor inválido para ${f}`, field: f, value: d[f], expectedRange: `${min}-${max}` }); 
             } 
         } 
 
         await client.query('BEGIN'); 
         const vals = [ 
             d.name?.trim(), +d.age || null, +d.weight || null, +d.height || null, d.phone?.trim(), d.email?.trim() || null, 
             d.sport?.trim(), d.position?.trim() || null, d.level || 'Amateur', d.dominance || 'Diestro', d.experience || 'intermediate', 
             d.goal?.trim(), d.painLocation?.trim() || null, +d.painLevel || 0, d.painType || null, 
             +d.trainingFrequency || 0, +d.trainingHours || 0, !!d.recentChanges, 
             d.injuries?.trim() || null, +d.sleepHours || null, d.stressLevel || 'Medio', 
             d.submittedAt || new Date().toISOString(), req.ip || req.connection.remoteAddress, req.get('user-agent') || null 
         ]; 
 
         const q = ` 
             INSERT INTO anamnesis ( 
                 name, age, weight, height, phone, email, 
                 sport, position, level, dominance, experience, 
                 goal, pain_location, pain_level, pain_type, 
                 training_frequency, training_hours, recent_changes, 
                 injuries, sleep_hours, stress_level, 
                 submitted_at, ip_address, user_agent 
             ) VALUES (${Array.from({ length: 24 }, (_, i) => `$${i + 1}`).join(',')}) 
             RETURNING id, submitted_at 
         `; 
 
         const r = await client.query(q, vals); 
         await client.query('COMMIT'); 
 
         const { id, submitted_at } = r.rows[0]; 
         console.log('Anamnesis guardada:', { id, name: d.name, sport: d.sport, level: d.level, submittedAt: submitted_at }); 
         res.status(201).json({ message: 'Anamnesis guardada exitosamente', success: true, data: { id, submittedAt: submitted_at } }); 
 
     } catch (e) { 
         await client.query('ROLLBACK'); 
         console.error('Error guardando anamnesis:', e); 
         if (e.code === '23505') 
             return res.status(409).json({ message: 'Registro duplicado', error: process.env.NODE_ENV === 'development' ? e.message : undefined }); 
         res.status(500).json({ message: 'Error interno del servidor', error: process.env.NODE_ENV === 'development' ? e.message : undefined }); 
     } finally { 
         client.release(); 
     } 
 };