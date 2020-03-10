const router = require("express").Router(); // создали роутер

const { createCard, readCards, deleteCard } = require("../controllers/cards");

// router.get("/users", readUsers);
// router.get("/users/:id", readUser);
router.get("/cards", readCards);
router.post("/cards", createCard);
router.delete("/cards/:id", deleteCard);
// router.patch("/users/:id", updateUserInfo);
// router.patch("/users/:id/avatar", updateUserAvatar);

module.exports = router;
