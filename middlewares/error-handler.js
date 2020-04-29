const { ERROR_SERVER } = require('../config/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send(
    {
      message: statusCode === 500
        ? ERROR_SERVER
        : message,
    },
  );
};
