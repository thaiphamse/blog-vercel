const baseResponse = require("../configs/base.response")

const getIndexPage = async (req, res) => {
    console.log("req,user", req.user)
    console.log("req,user", req.session.user)

    res.render('index', {
        ...baseResponse,
        // toast: false,
        title: "Trang chủ",
        user: req.user
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
    getIndexPage,
    getPostPage
}
