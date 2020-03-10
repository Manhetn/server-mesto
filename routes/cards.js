const router = require("express").Router(); // создали роутер

const {
  createCard,
  readCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard
} = require("../controllers/cards");

router.get("/cards", readCards);
router.post("/cards", createCard);
router.delete("/cards/:id", deleteCard);
router.put("/cards/:id/likes", addLikeCard);
router.delete("/cards/:id/likes", deleteLikeCard);

module.exports = router;
