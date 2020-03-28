const router = require("express").Router();

const auth = require("../middlewares/auth.js");

const {
  createCard,
  readCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard
} = require("../controllers/cards");

router.use(auth);
router.get("/cards", readCards);
router.post("/cards", createCard);
router.delete("/cards/:id", deleteCard);
router.put("/cards/:id/likes", addLikeCard);
router.delete("/cards/:id/likes", deleteLikeCard);

module.exports = router;
