const { NOT_FOUND } = require('../configuration/constants');
const NotFoundError = require('../errors/not-found-err');

// Обработка несуществующего запроса
const error = (req, res, next) => next(new NotFoundError(NOT_FOUND));

module.exports = { error };
