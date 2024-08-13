const baseResponse = require("../configs/base.response")
const postModel = require("../models/post.model")
const topicModel = require("../models/topic.model")

const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

const getCreatePostPage = async (req, res, next) => {
    const topic = await topicModel.find()
    return res.render("createPost", {
        ...baseResponse,
        topic,
        user: req.user,
        title: "Tạo bài viết mới",
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

            return res.render("post", {
                ...baseResponse,
                user: req.user,
                title: `${postDb._id}`,
                content: contentDeltaOps,
                heading: headingDeltaOps
            })
        } catch (error) {
            next(error)
        }
    }
}
const savePost = async (req, res, next) => {
    const headingDelta = JSON.parse(req.body.headingDelta)
    const contentDelta = JSON.parse(req.body.contentDelta)
    const visibility = req.body.visibility || "private"
    const topicSlug = req.body.topic || ""
    const topic_id = await topicModel.findOne({
        slug: topicSlug
    }).select("_id")

    const newPost = new postModel({
        heading: headingDelta,
        content: contentDelta,
        author: req.user?._id,
        topic: topic_id,
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
