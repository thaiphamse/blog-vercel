// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
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
  tag: {
    type: String,
    require: true,
    index: true
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
    index: true
  },
  googleId: {
    type: String,
  },
  avatarUrl: {
    type: String,
    default: "https://res.cloudinary.com/disrx4gzn/image/upload/v1723609710/pbfpxc2zslbhrq7h7xky.jpg"
  },
  "sub-bio": {
    type: String
  },
  "external-link": [{ type: String }],
  followingPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}
  , {
    timestamps: true,
  });
// Middleware to automatically generate the tag from the username of the email
user.pre('save', function (next) {
  // Extract username from email
  if (this.email && this.isNew) {
    this.tag = "@" + this.email.toLowerCase().split('@')[0];
  }
  next();
});
// Compile model from schema
module.exports = mongoose.model("User", user);
