const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const url = require('./url-validation');

const { VALIDATION_ERRORS, INCORRECT_ID } = require('../configuration/constants');

const articleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages(VALIDATION_ERRORS),
    title: Joi.string().required().messages(VALIDATION_ERRORS),
    text: Joi.string().required().messages(VALIDATION_ERRORS),
    date: Joi.string().required().messages(VALIDATION_ERRORS),
    source: Joi.string().required().messages(VALIDATION_ERRORS),
    link: Joi.string().required().custom(url, 'url validation').messages(VALIDATION_ERRORS),
    image: Joi.string().required().custom(url, 'url validation').messages(VALIDATION_ERRORS),
  }),
});

const articleIdValidation = celebrate({
  params: Joi.object({
    articleId: Joi.objectId().message(INCORRECT_ID),
  }),
});

module.exports = { articleValidation, articleIdValidation };
