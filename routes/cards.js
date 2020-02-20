const router = require('express').Router();// создали роутер
const cards = require('../data/cards.json');

router.get('/', (req, res) => {
  res.json(cards);
});

module.exports = router;
