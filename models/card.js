const mongoose = require("mongoose");
const validator = require("validator");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Это обязательное поле"],
    minlength: [2, "Должно быть не менее 2 символов"],
    maxlength: [30, "Должно быть не более 30 символов"]
  },
  link: {
    type: String,
    required: [true, "Это обязательное поле"],
    validate: {
      validator: link => validator.isURL(link),
      message:
        "Ссылка на картинку должна быть в формате: https://sun9-24.userapi.com/c630831/v630831668/33726/KNQZxpXt3jk.jpg"
    }
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
