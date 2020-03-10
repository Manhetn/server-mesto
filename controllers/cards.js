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
  console.log(req.user._id);
  console.log(req.params);
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

// убрать лайк с карточки

module.exports = {
  createCard,
  readCards,
  deleteCard
};
