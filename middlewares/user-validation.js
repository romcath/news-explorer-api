const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const message = {
  name: {
    'string.empty': 'Поле `name` не может быть пустым',
    'string.min': 'Поле `name` не может быть меньше 2 символов',
    'string.max': 'Поле `name` не может быть больше 30 символов',
    'any.required': 'Отсутствует обязательное поле `name`',
  },
  email: {
    'string.empty': 'Поле `email` не может быть пустым',
    'string.email': 'Некорректный формат поля `email`',
    'any.required': 'Отсутствует обязательное поле `email`',
  },
  password: {
    'string.empty': 'Поле `password` не может быть пустым',
    'string.min': 'Поле `password` не может быть меньше 8 символов',
    'any.required': 'Отсутствует обязательное поле `password`',
  },
};

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(message.name),
    email: Joi.string().required().email().messages(message.email),
    password: Joi.string().required().min(8).messages(message.password),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(message.email),
    password: Joi.string().required().min(8).messages(message.password),
  }),
});

module.exports = {
  createUserValidation,
  loginUserValidation,
};
