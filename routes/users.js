const router = require("express").Router(); // создали роутер

const auth = require("../middlewares/auth.js");
const { idVerification } = require("../middlewares/idVerification.js");
const {
  registrationCheckSchema,
  loginCheckSchema,
  userInfoCheckSchema,
  userAvatarCheckSchema,
  idCheckSchema
} = require("../validation/validationCelebrate");

const {
  login,
  readUsers,
  readUser,
  createUser,
  updateUserInfo,
  updateUserAvatar
} = require("../controllers/users");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
router.post("/signin", loginCheckSchema, login);
router.post("/signup", registrationCheckSchema, createUser);
router.use(auth);
router.get("/users", readUsers);
router.get("/users/:id", idCheckSchema, idVerification, readUser);
router.patch("/users/me", userInfoCheckSchema, updateUserInfo);
router.patch("/users/me/avatar", userAvatarCheckSchema, updateUserAvatar);

module.exports = router;
