exports.submitAnamnesis = (req, res) => {
    try {
        const data = req.body;
        console.log('Anamnesis received:', data);

        // Here you would save to database

        res.status(201).json({
            message: 'Anamnesis submitted successfully',
            data: data
        });
    } catch (error) {
        console.error('Error submitting anamnesis:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
