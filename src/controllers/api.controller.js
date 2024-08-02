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

module.exports = {

}
