const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { USER_NOT_FOUND, USER_EMAIL_CONFLICT, USER_CAN_NOT_CREATE } = require('../config/constants');
const { SECRET, LIFETIME_COOKIES } = require('../config/config');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict');

// Возвращает информацию о пользователе
const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then(user => res.send(user))
    .catch(next);
};

// Создаёт пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name, email, password: hash,
    }))
    .then(user => res.status(201).send(user.omitPrivate()))
    .catch(err => {
      if (err.errors.email) {
        next(new ConflictError(USER_EMAIL_CONFLICT));
        return;
      }
      next(new Error(USER_CAN_NOT_CREATE));
    });
};

// Проверяет почту и пароль, создаёт JWT
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, SECRET);
      res.cookie('jwt', token, { maxAge: LIFETIME_COOKIES, httpOnly: true, sameSite: true }).end();
    })
    .catch(next);
};


module.exports = {
  getUserMe,
  createUser,
  login,
};
