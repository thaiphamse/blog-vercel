const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const tag = new Schema({
  name: String,
  'en-description': {
    type: String,
  },
  'vi-description': {
    type: String,
  },
  slug: {
    type: String,
    required: true
  }
}
  , {
    timestamps: true,
  });
tag.pre('save', function (next) {
  if (!this.slug) this.slug = this.name.split(" ").join("-");
  next();
});
// Compile model from schema
module.exports = mongoose.model("Tag", tag);
