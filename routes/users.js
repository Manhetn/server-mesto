const router = require('express').Router(); // создали роутер
const users = require('../data/users.json');

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  let user = users.find(item => item._id === id);
  if (!user) {
    return res.status(404).json({ message: 'Нет пользователя с таким id' });
  }
  return res.json(user);
});
module.exports = router;
