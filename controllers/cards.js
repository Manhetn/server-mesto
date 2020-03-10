const Card = require("../models/card");
// возвращает все карточки
const readCards = (req, res) => {
  Card.find(req.params)
    .then(card => res.status(200).send({ data: card }))
    .catch(err =>
      res.status(500).send({
        message: "Что-то пошло не так :(",
        error: err
      })
    );
};
// создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send({ data: card }))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка создания карточик",
        error: err
      })
    );
};
// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка удаления карточик",
        error: err
      })
    );
};
// поставить лайк карточке
const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(card => res.send(card))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка постановки like карточик",
        error: err
      })
    );
};
const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then(card => res.send(card))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка в удалении like карточки",
        error: err
      })
    );
};

module.exports = {
  createCard,
  readCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard
};
