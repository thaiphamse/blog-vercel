const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');
const verify = require('../middlewares/verify');

router.get('/post', verify.isLogin, siteController.getPostPage);
router.get('/', siteController.getIndexPage);

module.exports = router
