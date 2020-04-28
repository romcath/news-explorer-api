const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict');

// Возвращает информацию о пользователе (email и имя)
const getUserMe = (req, res, next) => {
  const { _id: id } = req.user;
  User.findById(id)
    .orFail(new NotFoundError(`Нет пользователя с id ${id}`))
    .then(user => res.send(user))
    .catch(next);
};

// Создаёт пользователя
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      email, password: hash, name,
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

module.exports = {
  getUserMe,
  createUser,
};
