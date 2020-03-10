const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true,
    match: /https?:\/\/\S+(?:\.[a-zA-Z]{2,8})\/\S+/
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: []
    }
  ]
});

module.exports = mongoose.model("card", cardSchema);
