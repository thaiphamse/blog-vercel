const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const verifyMiddleware = require('../middlewares/verify')
// [/post]

router.get('/:tag', profileController.getProfilePage);

module.exports = router
