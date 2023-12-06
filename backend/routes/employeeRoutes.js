const express = require('express');

const router = express.Router();

// fetching the controllers
const employeeController = require('../controllers/employeeController');

router.post('/saveProfile', employeeController.handleSaveProfile);

router.get('/:id', employeeController.handleGetEmployeeById);

module.exports = router;
