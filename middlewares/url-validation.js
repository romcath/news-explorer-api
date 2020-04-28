const { isURL } = require('validator');

module.exports = (value, helpers) => {
  if (!isURL(value)) {
    return helpers.message(`Некорректный формат поля ${helpers.state.path}`);
  }
  return value;
};
