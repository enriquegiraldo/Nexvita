const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const anamnesisRoutes = require('./routes/anamnesis');

app.get('/', (req, res) => {
  res.send('Drolean API is running');
});

app.use('/api', anamnesisRoutes);

module.exports = app;

