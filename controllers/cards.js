const Card = require("../models/card.js");


const createCard = (req, res) => {
  const { name, link, ownerId } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send(card))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемая карточка не найдена"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемая карточка не найдена"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const deleteCArd = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемая карточка не найдена"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемая карточка не найдена"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемая карточка не найдена"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

module.exports = {
  createCard,
  getCard,
  deleteCArd,
  likeCard,
  dislikeCard,
};
