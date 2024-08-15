// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

const post = new Schema({
  heading: {
    type: Array,
    get: parseToHtml
  },
  description: {
    type: String
  },
  content: {
    type: Array,
    get: parseToHtml
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', index: true, },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', require: true },
  views: { type: Number, default: 0 }, // Số lượt xem
  likes: { type: Number, default: 0 }, // Số lượt thích
  comments: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    commentMedia: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }], // Mảng chứa các bình luận
  visibility: {
    type: String,
    enum: ['public', 'private', 'draft'],
    default: 'draft',
    index: true
  },
  thumnail: {
    type: String,
    default: "https://www.techsmith.com/blog/wp-content/uploads/2021/02/video-thumbnails-social.png"
  }
}
  , {
    timestamps: true,
  });

function parseToHtml(deltaOps) {
  const content = new QuillDeltaToHtmlConverter(deltaOps, {});
  return content.convert()
}
// Compile model from schema
module.exports = mongoose.model("Post", post);
