const baseResponse = require('../configs/base.response');
const userModel = require('../models/user.model')
const isLogin = async (req, res, next) => {
    let user = await userModel.findById(req.user?._id)

    if (!user && !(req.session?.passport?.user)) {
        return res.render('login', {
            ...baseResponse,
            toast: true,
            toast: { // Thông báo khi load vào trang
                type: 'Error',
                title: 'Thông báo',
                message: 'Vui lòng đăng nhập',
            }
        });
    }
    console.log('user', user)
    next()
}

module.exports = {
    isLogin,
}