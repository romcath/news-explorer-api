const { NOT_FOUND } = require('../configuration/constants');
const NotFoundError = require('../errors/not-found-err');

// Обработка несуществующего запроса
const notFoundRoute = (req, res, next) => next(new NotFoundError(NOT_FOUND));

module.exports = { notFoundRoute };
