const jwt = require('jsonwebtoken');

const { SECRET } = require('../configuration/config');
const { REQUEST_LOGIN } = require('../configuration/constants');
const UnauthorizedError = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(REQUEST_LOGIN));
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return next(new UnauthorizedError(REQUEST_LOGIN));
  }

  req.user = payload;

  return next();
};
