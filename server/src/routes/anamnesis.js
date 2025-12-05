const express = require('express');
const router = express.Router();
const anamnesisController = require('../controllers/anamnesisController');

router.post('/anamnesis', anamnesisController.submitAnamnesis);

module.exports = router;
