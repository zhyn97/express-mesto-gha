const User = require("../models/user.js");

const getOneUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if(user){
      res.send(user)
      }else{
        return res.status(404).send({message : "Запрашиваемый пользователь не найден"})
      }
    })
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(400).send({message : "Запрашиваемый пользователь не найден"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемый пользователь не найден"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемый пользователь не найден"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемый пользователь не найден"})
      }
      if(err.name === "NotFound"){
        return res.status(404).send({message : "Страница не существует"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемый пользователь не найден"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if(err.name === "ValidationError"){
        return res.status(400).send({message : "Переданы некорректные данные"});
      }
      if(err.name === "CastError"){
        return res.status(404).send({message : "Запрашиваемый пользователь не найден"})
      }
      if(err.name === "NotFound"){
        return res.status(404).send({message : "Страница не существует"})
      }
      if(!err.name === "ValidationError" || !err.name === "CastError"){
        return res.status(500).send({message : "Неизвестная ошибка"})
      }
    });
};

module.exports = {
  getOneUser,
  getUsers,
  createUser,
  updateUserProfile,
  deleteUser,
  updateAvatar,
};
