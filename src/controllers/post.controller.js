const baseResponse = require("../configs/base.response")

const getCreatePostPage = async (req, res, next) => {

    return res.render("createPost", {
        ...baseResponse,
        user: req.user,
        title: "Đăng bài viết",
        footer: false
    })
}
const getPostPage = async (req, res) => {

    res.render('post', {
        ...baseResponse,
        // toast: false,
        title: "Tất cả bài viết",
        user: req.user
    })
}
module.exports = {
    getCreatePostPage,
    getPostPage
}

