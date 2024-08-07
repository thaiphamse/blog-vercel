const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const verifyMiddleware = require('../middlewares/verify')
// [/post]

router.get('/view/:id', postController.viewPost);
router.post('/save', postController.savePost);
router.get('/', postController.getCreatePostPage);

module.exports = router
