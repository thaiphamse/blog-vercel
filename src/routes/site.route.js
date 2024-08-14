const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');

// router.get('/post', siteController.getPostPage);
router.get('/', siteController.getIndexPage);

module.exports = router
