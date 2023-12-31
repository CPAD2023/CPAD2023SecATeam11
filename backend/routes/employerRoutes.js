const express = require('express');

const router = express.Router();

// fetching the controllers
const employerController = require('../controllers/employerController');

router.post('/saveProfile', employerController.handleSaveProfile);

router.get('/:id', employerController.handleGetEmployerById);

module.exports = router;
