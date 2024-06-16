// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  fullname: {
    type: String,
    default: 'Guest',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: { //custom validation for email
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
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
    default: 'active',
  }
}
  , {
    timestamps: true,

  });

// Compile model from schema
module.exports = mongoose.model("users", users);
