// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
  heading: Array,
  content: {
    type: Array,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', require: true },
  visibility: {
    type: String,
    enum: ['public', 'private', 'draft'],
    default: 'private',
  }
}
  , {
    timestamps: true,
  });

// Compile model from schema
module.exports = mongoose.model("Post", post);
