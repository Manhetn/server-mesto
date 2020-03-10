const router = require("express").Router(); // создали роутер

const {
  readUsers,
  readUser,
  createUser,
  updateUserInfo,
  updateUserAvatar
} = require("../controllers/users");

router.get("/users", readUsers);
router.get("/users/:id", readUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUserInfo);
router.patch("/users/:id/avatar", updateUserAvatar);

module.exports = router;
