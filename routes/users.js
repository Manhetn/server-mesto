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
router.use(auth);
router.get("/users", readUsers);
router.get("/users/:id", readUser);
router.patch("/users/:id", updateUserInfo);
router.patch("/users/:id/avatar", updateUserAvatar);

module.exports = router;
