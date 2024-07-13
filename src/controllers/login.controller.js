const baseResponse = require('../configs/base.response')
const userModel = require('../models/user')
const getLoginPage = async (req, res, next) => {
    try {

        res.render('login', {
            ...baseResponse,
            title: "Đăng nhập"
        })

    } catch (err) {
        next(err)
    }
}
const getRegisterPage = async (req, res, next) => {
    res.render('register', {
        ...baseResponse,
        title: "Đăng ký"
    })
}
const register = async (req, res, next) => {
    const registerBody = req.body
    let newUser = new userModel({
        username: "test",
        password: 'test',
        email: "hihi123@gmail.com",
    })
    await newUser.save()
    console.log(registerBody)
}
const login = async (req, res, next) => {
    const loginBody = req.body
    console.log(loginBody)
}

module.exports = {
    getRegisterPage,
    getLoginPage,
    register,
    login,
}