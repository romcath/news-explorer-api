const { NOT_FOUND } = require('../configuration/constants');

// Обработка несуществующего запроса
const error = (req, res) => {
  res.status(404).send({ message: NOT_FOUND });
};

module.exports = { error };
