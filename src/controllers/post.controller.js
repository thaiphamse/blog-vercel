const baseResponse = require("../configs/base.response")
const postModel = require("../models/post.model")
const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

const getCreatePostPage = async (req, res, next) => {

    return res.render("createPost", {
        ...baseResponse,
        user: req.user,
        title: "Đăng bài viết",
        footer: false
    })
}

const viewPost = async (req, res, next) => {
    const idQuery = req.params?.id;//idPost
    if (idQuery) {
        console.log(idQuery)
        try {
            const postDb = await postModel.findById(idQuery).
                populate([{ path: 'author', select: "username fullname email role" }])
            console.log(postDb)

            const contentDeltaOps = postDb.content
            const headingDeltaOps = postDb.heading
            const content = new QuillDeltaToHtmlConverter(contentDeltaOps, {});
            const heading = new QuillDeltaToHtmlConverter(headingDeltaOps, {});
            const contentHtml = content.convert();
            const headingHtml = heading.convert()

            return res.render("post", {
                ...baseResponse,
                user: req.user,
                title: `${postDb._id}`,
                content: contentHtml,
                heading: headingHtml
            })
        } catch (error) {
            next(error)
        }
    }
}
const savePost = async (req, res, next) => {
    const headingDelta = JSON.parse(req.body.headingDelta)
    const contentDelta = JSON.parse(req.body.contentDelta)
    const visibility = req.body.visibility

    const newPost = new postModel({
        heading: headingDelta,
        content: contentDelta,
        author: req.user?._id,
        visibility
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
