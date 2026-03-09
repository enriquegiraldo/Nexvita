const express = require('express');
const router = express.Router();
const anamnesisController = require('../controllers/anamnesisController');

router.get('/anamnesis', anamnesisController.listAnamnesis);
router.post('/anamnesis', anamnesisController.submitAnamnesis);

module.exports = router;
