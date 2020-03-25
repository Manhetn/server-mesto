const router = require("express").Router();

const auth = require("../middlewares/auth.js");

const {
  createCard,
  readCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard
} = require("../controllers/cards");

router.get("/cards", auth, readCards);
router.post("/cards", auth, createCard);
router.delete("/cards/:id", auth, deleteCard);
router.put("/cards/:id/likes", auth, addLikeCard);
router.delete("/cards/:id/likes", auth, deleteLikeCard);

module.exports = router;
