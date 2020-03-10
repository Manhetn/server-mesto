const User = require("../models/user");

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

const readUser = (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err =>
      res.status(500).send({
        message: "Пользователь не найден",
        error: err
      })
    );
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка создания пользователя",
        error: err
      })
    );
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    // .then(user => res.send({ data: user }))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка обновления информации пользователя",
        error: err
      })
    );
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  console.log(req.body);
  console.log(req.params.id);
  User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    // .then(user => res.send({ data: user }))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка обновления ававтара пользователя",
        error: err
      })
    );
};

module.exports = {
  readUsers,
  readUser,
  createUser,
  updateUserInfo,
  updateUserAvatar
};
