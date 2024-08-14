const baseResponse = require("../configs/base.response")
const postModel = require("../models/post.model")
const topicModel = require("../models/topic.model")
const getIndexPage = async (req, res) => {
    const topics = await topicModel.find()
    const newPost = await postModel.find({
        visibility: "public"
    }).populate("author topic").sort({ createdAt: "desc" })
    res.render('index', {
        ...baseResponse,
        // toast: false,
        title: "Trang chủ",
        user: req.user,
        newPost,
        topics
    })
}

module.exports = {
    getIndexPage,
}
