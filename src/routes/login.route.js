const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signIn.controller');


router.get('/', signInController.getSignInPage);
module.exports = router
