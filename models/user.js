const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Это обязательное поле"],
    minlength: [2, "Должно быть не менее 2 символов"],
    maxlength: [30, "Должно быть не более 30 символов"]
  },
  about: {
    type: String,
    required: [true, "Это обязательное поле"],
    minlength: [2, "Должно быть не менее 2 символов"],
    maxlength: [30, "Должно быть не более 30 символов"]
  },
  avatar: {
    type: String,
    required: [true, "Это обязательное поле"],
    validate: {
      validator: link => validator.isURL(link),
      message:
        "Ссылка на аватар должна быть в формате: https://sun9-24.userapi.com/c630831/v630831668/33726/KNQZxpXt3jk.jpg"
    }
  },
  email: {
    type: String,
    required: [true, "Это обязательное поле"],
    unique: true,
    validate: {
      validator: email => validator.isEmail(email),
      message: "Электронная почта должна быть в формате: sega@yandex.ru"
    }
  },
  password: {
    type: String,
    required: [true, "Это обязательное поле"],
    minlength: [8, "Должно быть не менее 8 символов"],
    select: false
  }
});

userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email })
    .select("+password")
    .then(user => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
