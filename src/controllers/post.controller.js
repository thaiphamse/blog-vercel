const baseResponse = require("../configs/base.response")
const postModel = require("../models/post.model")
const getCreatePostPage = async (req, res, next) => {

    return res.render("createPost", {
        ...baseResponse,
        user: req.user,
        title: "Đăng bài viết",
        footer: false
    })
}
var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

const viewPost = async (req, res, next) => {
    const idQuery = req.params?.id;//idPost
    console.log(idQuery);
    if (idQuery) {
        console.log(idQuery)
        try {
            const postDb = await postModel.findById(idQuery).populate('author')
            console.log(postDb)



            // TypeScript / ES6:
            // import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

            var deltaOps = postDb.content

            var cfg = {};

            var converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);

            var html = converter.convert();
            console.log(html);
            return res.render("post", {
                ...baseResponse,
                user: req.user,
                title: `${postDb._id}`,
                footer: true,
                content: html
            })
        } catch (error) {
            next(error)
        }
    }
}
const savePost = async (req, res, next) => {
    const delta = JSON.parse(req.body.contentDelta)
    console.log(req.user)
    const newPost = new postModel({
        content: delta,
        author: req.user?._id
    })
    try {
        const savedPost = await newPost.save()
        return res.redirect(`/post/view/${savedPost._id}`)

    } catch (error) {
        next(error)
    }

}
module.exports = {
    getCreatePostPage,
    viewPost,
    savePost
}

