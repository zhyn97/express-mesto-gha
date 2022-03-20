const router = require('express').Router(); // создали роутер

const {
  createCard,
  getCard,
  deleteCArd,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/cards', createCard);

router.get('/cards', getCard);

router.delete('/cards/:id', deleteCArd);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
