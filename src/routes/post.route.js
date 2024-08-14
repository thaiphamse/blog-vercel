const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const verifyMiddleware = require('../middlewares/verify')
// [/post]

router.get('/view/:id', postController.viewPost);
router.get('/edit/:id', verifyMiddleware.isLogin, postController.editPostPage);

router.post('/save', verifyMiddleware.isLogin, postController.savePost);
router.get('/new', verifyMiddleware.isLogin, postController.getCreatePostPage);

module.exports = router
