const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');

// Возвращает информацию о пользователе (email и имя)
const getUserMe = (req, res, next) => {
  const { _id: id } = req.user;
  User.findById(id)
    .orFail(new NotFoundError(`Нет пользователя с id ${id}`))
    .then(user => res.send(user))
    .catch(next);
};

module.exports = {
  getUserMe,
};
