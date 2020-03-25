const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // импортируем модуль jsonwebtoken
// const escape = require("escape-html"); // method is out of date
// const validator = require("validator");

const User = require("../models/user");

const { ObjectId } = mongoose.Types;

// login
const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then(user => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "secret-key",
        { expiresIn: "7d" }
      );
      res.cookie("token", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true
      });
      res.status(200).send({ message: "Вы успешно авторизировались!" });
    })
    .catch(err => {
      res.status(401).send({ message: err.message });
    });
};
// создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  User.validate({ name, about, avatar, email, password })
    .then(() => bcrypt.hash(password, 10))
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => res.status(201).send(user))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: `Данные невалидны. ${err}` });
      } else if (email) {
        res.status(500).send({ message: "Email уже занят" });
      } else {
        res.status(500).send({ message: "Ошибка на сервере", error: err });
      }
    });
};
// возвращает всех пользователей
const readUsers = (req, res) => {
  User.find(req.params.id)
    .then(user => res.status(200).send({ data: user }))
    .catch(err =>
      res.status(500).send({
        message: "Что-то пошло не так :(",
        error: err
      })
    );
};
// возвращает пользователя по _id
const readUser = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send({ message: "Невалидный id" });
    return;
  }
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "Пользователь не существует" });
      }
    })
    .catch(err =>
      res.status(500).send({
        message: "Ощибка на сервере",
        error: err
      })
    );
};
// обновляет профиль
const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send({ message: "Невалидный id" });
    return;
  }
  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => {
      if (req.user._id === req.params.id) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({
          message: "Недостаточно прав для изменения данных пользователя"
        });
      }
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Данные невалидны", error: err });
      } else {
        res.status(500).send({ message: "Ошибка на сервере", error: err });
      }
    });
};
// обновляет аватар
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send({ message: "Невалидный id" });
    return;
  }
  User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => {
      if (req.user._id === req.params.id) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({
          message: "Недостаточно прав для изменения аватара пользователя"
        });
      }
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Данные невалидны", error: err });
      } else {
        res.status(500).send({ message: "Ошибка на сервере", error: err });
      }
    });
};

module.exports = {
  login,
  readUsers,
  readUser,
  createUser,
  updateUserInfo,
  updateUserAvatar
};
