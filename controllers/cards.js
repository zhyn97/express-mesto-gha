/* eslint-disable consistent-return */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req');
const Forbidden = require('../errors/forbidden');

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Ошибка запроса');
      }

      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка запроса'));
      } else {
        next(err);
      }
    });
};

const getCard = (req, res, next) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ошибка запроса');
      }

      res.send(card);
    })
    .catch(next);
};

const deleteCArd = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('карточка не найдена');
      } else if (card.owner.toString() === req.user._id.toString()) {
        return Card.findByIdAndRemove(req.params.id)
          .then(() => {
            res.send(card);
          });
      } else {
        throw new Forbidden('Нет прав на удлаение карточки');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('карточка не найдена');
      }

      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('карточка не найдена');
      }

      res.send(card);
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCard,
  deleteCArd,
  likeCard,
  dislikeCard,
};
