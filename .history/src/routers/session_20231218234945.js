const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionController');
const UserService = require('../services/userService');
const { createHash, passwordValidation } = require('../utils/passwordHash');
const jwt = require('jsonwebtoken');
const UserDTO = require('..');

// Resto del código...

router.post('/register', sessionsController.register);
router.post('/login', sessionsController.login);
router.get('/current', sessionsController.current);
router.get('/unprotectedLogin', sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent', sessionsController.unprotectedCurrent);

module.exports = router;

