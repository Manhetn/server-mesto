const bcrypt = require("bcryptjs");

const User = require("../models/user");
const BadRequestError = require("../errors/badRequestError"); // 400
const ConflictError = require("../errors/conflictError"); // 409
const NotFoundError = require("../errors/notFoundError"); // 404
const UnauthorizedError = require("../errors/unauthorizedError"); // 401

const { createToken } = require("../middlewares/token");

// login
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then(user => {
      const token = createToken(user);
      res.cookie("token", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true
      });
      res.status(200).send({ message: "Вы успешно авторизировались!" });
    })
    .catch(err => {
      next(new UnauthorizedError(`${err.message}`));
    });
};
// создаёт пользователя
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.validate({ name, about, avatar, email, password })
    .then(() => bcrypt.hash(password, 10))
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user =>
      res.status(201).send({
        user: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email
        }
      })
    )
    .catch(err => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(`${err}`));
      } else if (email) {
        next(new ConflictError("Email уже занят"));
      } else {
        next(err);
      }
    });
};
// возвращает всех пользователей
const readUsers = (req, res, next) => {
  User.find(req.params.id)
    .then(user => res.status(200).send({ data: user }))
    .catch(err => next(err));
};
// возвращает пользователя по _id
const readUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        next(new NotFoundError("Пользователь не существует"));
      }
    })
    .catch(err => next(err));
};
// обновляет профиль
const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
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
        next(
          new NotFoundError("Вы не можете изменять данные друго пользователя")
        );
      }
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(`${err}`));
      } else {
        next(err);
      }
    });
};
// обновляет аватар
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
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
        next(
          new NotFoundError("Вы не можете изменять аватар друго пользователя")
        );
      }
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(`${err}`));
      } else {
        next(err);
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
