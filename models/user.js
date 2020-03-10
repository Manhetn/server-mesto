const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    match: /https?:\/\/\S+(?:\.[a-zA-Z]{2,8})\/\S+/
  }
});

module.exports = mongoose.model("user", userSchema);
