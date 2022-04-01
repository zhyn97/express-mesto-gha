/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9\-]*\.?)*\.{1}[A-Za-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

const {
  getOneUser,
  getUsers,
  updateUserProfile,
  deleteUser,
  updateAvatar,
  aboutMe,
  createUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', aboutMe);

router.post('/users', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (!regExp.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getOneUser);

router.delete('/users/:id', deleteUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (!regExp.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  }),
}), updateAvatar);

module.exports = router;
