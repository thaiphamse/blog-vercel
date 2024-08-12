const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require('passport-local')
const express = require('express')
const router = express.Router()
const baseResponse = require('../configs/base.response')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config()

//Local auth
passport.use(new LocalStrategy(
    async function (username, passwordRQ, done) {
        const userDb = await userModel.findOne({ username }).select('+password') // Get password

        if (!userDb)
            return done(null, false)
        if (!bcrypt.compareSync(passwordRQ, userDb.password))
            return done(null, false)
        //remove password in object
        const { password, ...other } = { ...userDb._doc }
        return done(null, other);
    }
));

//Google Oauth2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/redirect/google',
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken)
        const profileJosn = profile._json
        let email = profileJosn.email
        const displayName = profile.displayName
        const avatarUrl = profileJosn.picture

        const googleId = profile.id
        const isExist = await userModel.findOne(
            {
                googleId: profile.id,
            }
        )
        if (isExist) {
            //Sinh token

            let user = {
                fullname: displayName,
                email,
                avatarUrl,
                role: isExist.role,
                status: isExist.status,
            }
            return done(null, user);
        } else {
            const newUser = new userModel({
                username: email,
                fullname: displayName,
                email,
                googleId,
                role: 'user',
                status: 'active'
            })
            const saved = await newUser.save()
            // console.log('saved', saved)
            return done(null, saved)
        }
    }));

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

router.get('/register', (req, res) => {
    res.render('register', {
        ...baseResponse,
        title: "Đăng ký"
    })
});

router.post('/register', async (req, res) => {
    const registerUsername = req.body.username
    const registerPassword = req.body.password
    const registerRePassword = req.body['re-password']
    let usernameDb = await userModel.findOne({ username: registerUsername })

    if (registerRePassword !== registerPassword)
        return res.render("register", {
            ...baseResponse,
            toast: true,
            toast: { // Thông báo khi load vào trang
                type: 'success',
                title: 'Thông báo',
                message: 'Mật khẩu không trùng khớp',
            }
        })
    if (usernameDb) {
        return res.render("register", {
            ...baseResponse,
            toast: true,
            toast: { // Thông báo khi load vào trang
                type: 'success',
                title: 'Thông báo',
                message: 'Tên đăng nhập đã tồn tại',
            }
        })
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(registerPassword, salt);
    let newUser = new userModel({
        username: registerUsername,
        password: hash
    })
    try {
        await newUser.save()
        return res.render("register", {
            ...baseResponse,
            toast: true,
            toast: { // Thông báo khi load vào trang
                type: 'success',
                title: 'Thông báo',
                message: 'Đăng ký tài khoản thành công',
            }
        })
    } catch (error) {
        return res.render("register", {
            ...baseResponse,
            toast: true,
            toast: { // Thông báo khi load vào trang
                type: 'success',
                title: 'Thông báo',
                message: `Có lỗi xảy ra: ${error.message}`,
            }
        })
    }
});

router.get('/login/federated/google', passport.authenticate('google'));
router.get('/google', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login'
}));
router.get('/login', (req, res, next) => {
    res.render('login')
})
router.post('/login', function (req, res, next) {
    // passport.authenticate sử dụng chiến lược 'local'
    passport.authenticate('local', function (err, user, info) {
        // Nếu có lỗi xảy ra trong quá trình xác thực
        if (err) { return next(err); }
        // Nếu không có user (xác thực thất bại)
        if (!user) {
            // Truyền object message khi xác thực thất bại và render lại trang login
            return res.render('login', {
                ...baseResponse,
                toast: true,
                toast: { // Thông báo khi load vào trang
                    type: 'Error',
                    title: 'Thông báo',
                    message: 'Sai tên đăng nhập hoặc mật khẩu!',
                }
            });
        }
        // Nếu xác thực thành công, đăng nhập user vào session
        req.logIn(user, function (err) {
            // Nếu có lỗi xảy ra trong quá trình đăng nhập
            if (err) { return next(err); }
            // Nếu đăng nhập thành công, chuyển hướng về trang chủ
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Đã xảy ra lỗi khi đăng xuất');
        }
        req.user = {}
        res.redirect('/'); // Chuyển hướng sau khi đăng xuất thành công
    });
})
module.exports = router
