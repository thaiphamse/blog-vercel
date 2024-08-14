const baseResponse = require("../configs/base.response")
const postModel = require("../models/post.model")
const topicModel = require("../models/topic.model")

const getCreatePostPage = async (req, res, next) => {
    const topic = await topicModel.find()
    return res.render("createPost", {
        ...baseResponse,
        topic,
        user: req.user,
        title: "Tạo bài viết mới",
        footer: false
    })
}
const editPostPage = async (req, res, next) => {
    const idParams = req.params?.id;//idPost
    const userId = req.user ? req.user._id : null;

    let post;
    try {
        post = await postModel.findOne({
            _id: idParams,
            author: userId
        })
        if (!post) {
            return res.render("error", {
                ...baseResponse,
                toast: true,
                user: req.user,
                toast: { // Thông báo khi load vào trang
                    type: 'success',
                    title: 'Thông báo',
                    message: 'Bạn không thể chỉnh sửa bài viết của người khác',
                },
                footer: false
            })
        }
    } catch (error) {
        console.log(error);

    }

    const topic = await topicModel.find()
    return res.render("createPost", {
        ...baseResponse,
        topic,
        user: req.user,
        title: "Chỉnh sửa bài viết",
        footer: false,
        post
    })
}
const viewPost = async (req, res, next) => {
    const idQuery = req.params?.id;//idPost
    const userId = req.user ? req.user._id : null;
    console.log(userId)
    if (idQuery) {
        try {
            // Tracking views of post
            postModel.findByIdAndUpdate(idQuery, {
                $inc: { //increase view
                    views: 1
                }
            },
                {
                    new: true
                })
                .then(post => {
                    console.log('Views increase ', post.views, ' by: ', userId);
                })
                .catch(err => console.error(err));
            //Get post info
            const postDb = await postModel.findOne({
                _id: idQuery,
                $or: [
                    { visibility: 'public' }, // Bài viết công khai
                    { visibility: { $ne: 'public' }, author: userId } // Bài viết không công khai và tác giả là người dùng hiện tại
                ]
            }).
                populate([
                    { path: 'author', select: "_id username fullname email role" },
                    { path: 'topic', select: "_id name vi-description" }
                ])
            if (!postDb) {
                return res.render("error", {
                    ...baseResponse,
                    toast: true,
                    user: req.user,
                    toast: { // Thông báo khi load vào trang
                        type: 'success',
                        title: 'Thông báo',
                        message: 'Không thể xem bài viết',
                    },
                    footer: false
                })
            }

            return res.render("post", {
                ...baseResponse,
                user: req.user,
                title: `${postDb._id}`,
                post: postDb
            })
        } catch (error) {
            next(error)
        }
    }
}
const savePost = async (req, res, next) => {
    const headingDelta = JSON.parse(req.body.headingDelta)
    const contentDelta = JSON.parse(req.body.contentDelta)
    const postIdEdit = req.body.postId
    const visibility = req.body.visibility || "private"
    const topicSlug = req.body.topic || ""
    const topic_id = await topicModel.findOne({
        slug: topicSlug
    }).select("_id")
    // Edit post
    if (postIdEdit) {
        postModel.findByIdAndUpdate(postIdEdit, {
            heading: headingDelta,
            content: contentDelta,
            topic: topic_id,
            visibility
        })
            .then(data => res.redirect(`/post/view/${data._id}`))
            .catch(error => {
                console.log(error)
            })
        return
    }
    const newPost = new postModel({
        heading: headingDelta,
        content: contentDelta,
        author: req.user?._id,
        topic: topic_id,
        visibility
    })
    try {
        const savedPost = await newPost.save()
        return res.redirect(`/post/view/${savedPost._id}`)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getCreatePostPage,
    viewPost,
    savePost,
    editPostPage
}
