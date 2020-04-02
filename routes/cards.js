const router = require("express").Router();
const { idVerification } = require("../middlewares/idVerification.js");
const auth = require("../middlewares/auth.js");

const {
  createCard,
  readCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard
} = require("../controllers/cards");

const {
  idCheckSchema,
  cardCheckSchema
} = require("../validation/validationCelebrate");

router.use(auth);
router.get("/cards", readCards);
router.post("/cards", cardCheckSchema, createCard);
router.delete("/cards/:id", idCheckSchema, idVerification, deleteCard);
router.put("/cards/:id/likes", idCheckSchema, idVerification, addLikeCard);
router.delete(
  "/cards/:id/likes",
  idCheckSchema,
  idVerification,
  deleteLikeCard
);

module.exports = router;
