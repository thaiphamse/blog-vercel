const baseResponse = require("../configs/base.response")

const getIndexPage = async (req, res) => {
  console.log(req.user)
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
        title: "Bài đăng",
        user: req.user
    })
}
module.exports = {
    getIndexPage,
    getPostPage
}
