const router = require("express").Router(); // создали роутер
const auth = require("../middlewares/auth.js");

const {
  login,
  readUsers,
  readUser,
  createUser,
  updateUserInfo,
  updateUserAvatar
} = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/users", auth, readUsers);
router.get("/users/:id", auth, readUser);
router.patch("/users/:id", auth, updateUserInfo);
router.patch("/users/:id/avatar", auth, updateUserAvatar);

module.exports = router;
