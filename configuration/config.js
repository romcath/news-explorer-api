const {
  NODE_ENV,
  PORT = 3000,
  DATABASE = 'mongodb://localhost:27017/newsdb',
  JWT_SECRET,
} = process.env;

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const LIFETIME_COOKIES = 3600000 * 24 * 7;
const TIME = 15 * 60 * 1000;
const LIMIT_REQUESTS = 100;

module.exports = {
  NODE_ENV,
  PORT,
  DATABASE,
  JWT_SECRET,
  SECRET,
  LIFETIME_COOKIES,
  TIME,
  LIMIT_REQUESTS,
};
