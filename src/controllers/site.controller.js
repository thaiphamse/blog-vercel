const baseResponse = require("../configs/base.response")

const getIndexPage = async (req, res) => {

    res.render('index', {
        ...baseResponse,
        // toast: false,
        title: "Trang chủ"
    })
}
const getPostPage = async (req, res) => {

    res.render('post', {
        ...baseResponse,
        // toast: false,
        title: "Bài đăng"
    })
}
module.exports = {
    getIndexPage,
    getPostPage
}