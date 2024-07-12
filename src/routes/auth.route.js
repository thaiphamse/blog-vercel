const express = require('express');
const router = express.Router();
const signInController = require('../controllers/login.controller');

// 
router.get('/login', signInController.getLoginPage);
router.post('/login', signInController.login);

// 
router.get('/register', signInController.getRegisterPage);
router.post('/register', signInController.register);

module.exports = router
