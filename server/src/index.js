const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const anamnesisRoutes = require('./routes/anamnesis');

// Routes
app.get('/', (req, res) => {
    res.send('Drolean API is running');
});

app.use('/api', anamnesisRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
