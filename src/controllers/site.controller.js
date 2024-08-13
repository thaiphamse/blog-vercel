const baseResponse = require("../configs/base.response")
const postModel = require("../models/post.model")
const getIndexPage = async (req, res) => {
    const newPost = await postModel.find({
        visibility: "public"
    }).populate("author topic").sort({ createdAt: "desc" })
    console.log(newPost)
    res.render('index', {
        ...baseResponse,
        // toast: false,
        title: "Trang chủ",
        user: req.user,
        newPost
    })
}

module.exports = {
    getIndexPage,
}
