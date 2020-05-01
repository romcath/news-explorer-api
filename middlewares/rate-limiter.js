const rateLimit = require('express-rate-limit');

const { TIME, LIMIT_REQUESTS } = require('../configuration/config');

const limiter = rateLimit({
  windowMs: TIME,
  max: LIMIT_REQUESTS,
});

module.exports = {
  limiter,
};
