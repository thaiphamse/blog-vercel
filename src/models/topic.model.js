const mongoose = require("mongoose"), Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

// Define schema
const topic = new Schema({
  name: String,
  'en-description': {
    type: String,
  },
  'vi-description': {
    type: String,
  },
  slug: {
    type: String,
    slug: "name",
    require: true
  }
},
  {
    timestamps: true,
  });

// Compile model from schema
module.exports = mongoose.model("Topic", topic);
