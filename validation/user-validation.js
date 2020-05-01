const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { VALIDATION_ERRORS } = require('../configuration/constants');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(VALIDATION_ERRORS),
    email: Joi.string().required().email().messages(VALIDATION_ERRORS),
    password: Joi.string().required().min(8).messages(VALIDATION_ERRORS),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(VALIDATION_ERRORS),
    password: Joi.string().required().min(8).messages(VALIDATION_ERRORS),
  }),
});

module.exports = {
  createUserValidation,
  loginUserValidation,
};
