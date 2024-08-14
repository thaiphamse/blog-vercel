// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    index: true,
  },
  password: {
    select: false,
    type: String
  },
  fullname: {
    type: String,
    default: 'Guest',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: { //custom validation for email
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    default: "email@e.mail"
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: [true, 'Role is required'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  googleId: {
    type: String,
  },
  avatarUrl: {
    type: String,
    default: "https://res.cloudinary.com/disrx4gzn/image/upload/v1723609710/pbfpxc2zslbhrq7h7xky.jpg"
  },
  followingPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}
  , {
    timestamps: true,

  });

// Compile model from schema
module.exports = mongoose.model("User", user);
