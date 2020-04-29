const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/config');
const { NEED_LOGIN } = require('../config/constants');
const UnauthorizedError = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(NEED_LOGIN));
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return next(new UnauthorizedError(NEED_LOGIN));
  }

  req.user = payload;

  return next();
};
