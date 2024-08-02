const baseResponse = require('../configs/base.response');
const userModel = require('../models/user')
const isLogin = async (req, res, next) => {
    let user = await userModel.findById(req.user?._id)
    console.log('user', user)
    if (!user)
        return res.render('login', {
            ...baseResponse,
            toast: true,
            toast: { // Thông báo khi load vào trang
                type: 'Error',
                title: 'Thông báo',
                message: 'Vui lòng đăng nhập',
            }
        });
    console.log('user', user)
    next()
}

module.exports = {
    isLogin,
}