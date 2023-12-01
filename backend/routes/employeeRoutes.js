const express = require('express');

const router = express.Router();

// fetching the controllers
const employeeController = require('../controllers/employeeController');

router.post('/saveProfile', employeeController.handleSaveProfile);

router.post('/updateProfile', employeeController.handleUpdateProfile);

router.post('/applyJob', employeeController.handleApplyJob);

module.exports = router;
