const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
// const db = require("../models/index")
const jwtUtil = require('../utils/jwt')
require('dotenv').config()

//Google Oauth2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/redirect/google',
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
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
        console.log(isExist)
        let token = jwtUtil.generateToken(displayName, email)
        if (isExist) {
            //Sinh token

            let user = {
                fullname: displayName,
                email,
                avatarUrl,
                role: isExist.role,
                status: isExist.status,
                tk: token
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

router.get('/login/federated/google', passport.authenticate('google'));
router.get('/google', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login'
}));

module.exports = router
