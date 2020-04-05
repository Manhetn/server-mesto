const Card = require("../models/card");
const BadRequestError = require("../errors/badRequestError"); // 400
const ConflictError = require("../errors/conflictError"); // 409
const NotFoundError = require("../errors/notFoundError"); // 404

// возвращает все карточки
const readCards = (req, res, next) => {
  Card.find(req.params)
    .then(card => res.status(200).send({ data: card }))
    .catch(err => next(err));
};
// создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(`Данные невалидны: ${err}`));
      } else {
        next(err);
      }
    });
};
// удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then(card => {
      if (!card) {
        next(new NotFoundError("Такой карточки не существует"));
      } else if (req.user._id !== card.owner.toString()) {
        next(new ConflictError("Нельзя удалить карточку другого пользователя"));
      } else {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.send({ message: "Карточка удалена" }))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
};
// поставить лайк карточке
const addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(card => {
      if (card) {
        res.status(200).send(card);
      } else {
        next(
          new NotFoundError(
            "Вы пытаетсь поставить лайк несуществующей карточке"
          )
        );
      }
    })
    .catch(err => next(err));
};
const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then(card => {
      if (card) {
        res.status(200).send(card);
      } else {
        next(
          new NotFoundError("Вы пытаетсь удалить лайк несуществующей карточке")
        );
      }
    })
    .catch(err => next(err));
};

module.exports = {
  createCard,
  readCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard
};
