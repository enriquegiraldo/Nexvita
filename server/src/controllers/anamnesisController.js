const pool = require('../db');

exports.submitAnamnesis = async (req, res) => {
    try {
        const data = req.body;
        console.log('Anamnesis received:', data);

        // Here you would save to database
        const {
            name,
            phone,
            email,
            age,
            weight,
            height,
            experience,
            goal,
            injuries,
            // New fields
            sport,
            position,
            level,
            dominance,
            painLocation,
            painLevel,
            painType,
            trainingFrequency,
            trainingHours,
            recentChanges,
            sleepHours,
            stressLevel
        } = data;

        const result = await pool.query(
            `INSERT INTO anamnesis
              (name, phone, email, age, weight, height, experience, goal, injuries,
               sport, position, level, dominance,
               pain_location, pain_level, pain_type,
               training_frequency, training_hours, recent_changes,
               sleep_hours, stress_level)
             VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8, $9,
               $10, $11, $12, $13,
               $14, $15, $16,
               $17, $18, $19,
               $20, $21)
             RETURNING id, created_at`,
            [
                name,
                phone,
                email || null,
                age !== '' && age != null ? Number(age) : null,
                weight !== '' && weight != null ? Number(weight) : null,
                height !== '' && height != null ? Number(height) : null,
                experience,
                goal,
                injuries,
                sport || null,
                position || null,
                level || null,
                dominance || null,
                painLocation || null,
                painLevel !== '' && painLevel != null ? Number(painLevel) : null,
                painType || null,
                trainingFrequency !== '' && trainingFrequency != null ? Number(trainingFrequency) : null,
                trainingHours !== '' && trainingHours != null ? Number(trainingHours) : null,
                recentChanges || false,
                sleepHours !== '' && sleepHours != null ? Number(sleepHours) : null,
                stressLevel || null
            ]
        );

        res.status(201).json({
            message: 'Anamnesis submitted successfully',
            id: result.rows[0]?.id,
            createdAt: result.rows[0]?.created_at,
            data: data
        });
    } catch (error) {
        console.error('Error submitting anamnesis:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
