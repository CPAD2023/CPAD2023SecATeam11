const express = require('express');

const router = express.Router();

// fetching the controllers
const authController = require('../controllers/authController');

router.post('/signup', authController.handleSignup);

router.post('/login', authController.handleLogin);

module.exports = router;
