/* eslint-disable consistent-return */
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req');
const BadAuthError = require('../errors/bad-auth');
const Conflict = require('../errors/conflict');

const getOneUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new BadRequestError('Ошибка запроса');
      }

      res.send(users);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      if (!validator.isEmail(email)) {
        throw new BadRequestError('Введены некорректные данные');
      }
      return User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          if (!user) {
            throw new BadRequestError('Введены некорректные данные');
          }
          return User.findOne({ _id: user._id })
            .then((newUser) => res.send(newUser));
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict('такой email уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Ошибка запроса'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new BadAuthError('Ошибка авторизации');
      }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка запроса'));
      } else {
        next(err);
      }
    });
};

const deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.send(user);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка запроса'));
      } else {
        next(err);
      }
    });
};

const aboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getOneUser,
  getUsers,
  createUser,
  login,
  updateUserProfile,
  deleteUser,
  updateAvatar,
  aboutMe,
};
