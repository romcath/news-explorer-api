const {
  NODE_ENV,
  PORT = 3000,
  DATABASE = 'mongodb://localhost:27017/newsdb',
  JWT_SECRET,
} = process.env;

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  NODE_ENV,
  PORT,
  DATABASE,
  JWT_SECRET,
  SECRET,
};
