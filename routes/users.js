const router = require("express").Router(); // создали роутер

const users = require("../data/users.json");

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const id = req.params.id;
  // eslint-disable-next-line no-underscore-dangle
  const user = users.find(item => item._id === id);
  if (!user) {
    return res.status(404).json({ message: "Нет пользователя с таким id" });
  }
  return res.json(user);
});

module.exports = router;
