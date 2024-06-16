const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');


router.get('/', siteController.getIndexPage);
module.exports = router
