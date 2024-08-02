const baseResponse = require("../configs/base.response")

const getIndexPage = async (req, res) => {

    res.render('index', {
        ...baseResponse,
        // toast: false,
        title: "Trang chủ",
        user: req.user
    })
}

module.exports = {
    getIndexPage,
}
