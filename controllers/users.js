const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SECRET } = require('../config');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict');

// Возвращает информацию о пользователе (email и имя)
const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(`Нет пользователя с id ${req.user._id}`))
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
        next(new ConflictError(`Почта ${email} уже используется`));
        return;
      }
      next(new Error('Ошибка при создании пользователя'));
    });
};

// Проверяет почту и пароль, создаёт JWT
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, SECRET);
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).end();
    })
    .catch(next);
};


module.exports = {
  getUserMe,
  createUser,
  login,
};
