
const isLogin = async (req, res, next) => {
    let user = req.user || req.session.user
    console.log(user?.tk)
    next()
}

module.exports = {
    isLogin,
}
