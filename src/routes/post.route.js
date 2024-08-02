const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const verifyMiddleware = require('../middlewares/verify')

router.get('/view', postController.getPostPage);
router.get('/', postController.getCreatePostPage);

module.exports = router
