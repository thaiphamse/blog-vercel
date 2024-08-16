const mongoose = require("mongoose")
const baseResponse = require("../configs/base.response")
const postModel = require("../models/post.model")
const topicModel = require("../models/topic.model")
const userModel = require("../models/user.model")

const getProfilePage = async (req, res, next) => {
    const userTagName = req.params.tag || null
    const userLogin = req.user || req.session?.passport?.user || null
    try {
        const user = await userModel.findOne({
            tag: userTagName
        })
        // Kiểm tra xem người dùng đang truy cập có phải là chính tác giả không
        const isAuthor = userLogin && new mongoose.Types.ObjectId(userLogin._id).equals(user._id);

        const post = await postModel.find({
            author: user._id, // Lấy bài viết của người dùng profile
            ...(isAuthor ? {} : { visibility: 'public' }) // Nếu không phải tác giả, chỉ lấy bài viết public
        }).sort({ createdAt: 'desc' })
            .populate([
                { path: 'author', select: "_id username fullname email role tag avatarUrl" },
                { path: 'topic', select: "_id name vi-description slug" }])

        return res.render("profile", {
            ...baseResponse,
            userPost: post,
            user: req.user,
            userProfile: user,
            title: "Profile " + user.fullname,
            footer: false
        })
    } catch (error) {
        next(error)
    }


}

module.exports = {
    getProfilePage
}
