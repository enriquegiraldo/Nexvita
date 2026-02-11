const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const anamnesisRoutes = require('./routes/anamnesis');

app.get('/', (req, res) => {
  const clientDistPath = path.join(__dirname, '../../client/dist');
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.send('Drolean API is running');
});

app.use('/api', anamnesisRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const clientDistPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

module.exports = app;

