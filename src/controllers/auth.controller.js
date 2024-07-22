// const baseResponse = require('../configs/base.response')
// const userModel = require('../models/user')
// const getLoginPage = async (req, res, next) => {
//     res.render('login', {
//         ...baseResponse,
//         title: "Đăng nhập"
//     })

// }
// const getRegisterPage = async (req, res, next) => {
//     res.render('register', {
//         ...baseResponse,
//         title: "Đăng ký"
//     })
// }
// const register = async (req, res, next) => {
//     const registerUsername = req.body.username
//     const registerPassword = req.body.password
//     const registerRePassword = req.body['re-password']
//     let usernameDb = await userModel.findOne({ username: registerUsername })

//     if (registerRePassword !== registerPassword)
//         return res.render("register", {
//             ...baseResponse,
//             toast: true,
//             toast: { // Thông báo khi load vào trang
//                 type: 'success',
//                 title: 'Thông báo',
//                 message: 'Mật khẩu không trùng khớp',
//             }
//         })
//     if (usernameDb) {
//         return res.render("register", {
//             ...baseResponse,
//             toast: true,
//             toast: { // Thông báo khi load vào trang
//                 type: 'success',
//                 title: 'Thông báo',
//                 message: 'Tên đăng nhập đã tồn tại',
//             }
//         })
//     }
//     let newUser = new userModel({
//         username: registerUsername,
//         password: registerPassword
//     })
//     try {
//         await newUser.save()
//         return res.render("register", {
//             ...baseResponse,
//             toast: true,
//             toast: { // Thông báo khi load vào trang
//                 type: 'success',
//                 title: 'Thông báo',
//                 message: 'Đăng ký tài khoản thành công',
//             }
//         })
//     } catch (error) {
//         return res.render("register", {
//             ...baseResponse,
//             toast: true,
//             toast: { // Thông báo khi load vào trang
//                 type: 'success',
//                 title: 'Thông báo',
//                 message: `Có lỗi xảy ra: ${error.message}`,
//             }
//         })
//     }

// }
// const login = async (req, res, next) => {
//     const body = req.body
//     const username = body.username
//     const password = body.password
//     const userDb = await userModel.findOne({ username })

//     if (!userDb)
//         return res.render("login", {
//             ...baseResponse,
//             toast: true,
//             toast: { // Thông báo khi load vào trang
//                 type: 'Error',
//                 title: 'Thông báo',
//                 message: `Tài khoản không tồn tại!`,
//             }
//         })
//     if (password !== userDb.password)
//         return res.render("login", {
//             ...baseResponse,
//             toast: true,
//             toast: { // Thông báo khi load vào trang
//                 type: 'Error',
//                 title: 'Thông báo',
//                 message: `Mật khẩu không chính xác!`,
//             }
//         })

//     req.user = userDb;
//     return res.redirect('/')
// }
// const logout = async (req, res, next) => {
//     console.log(req.user)
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).send('Đã xảy ra lỗi khi đăng xuất');
//         }
//         req.user = {}
//         res.redirect('/'); // Chuyển hướng sau khi đăng xuất thành công
//     });
// }

// module.exports = {
//     getRegisterPage,
//     getLoginPage,
//     register,
//     login,
//     logout
// }
