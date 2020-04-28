const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const url = require('./url-validation');

const message = {
  keyword: {
    'string.empty': 'Поле `keyword` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `keyword`',
  },
  title: {
    'string.empty': 'Поле `title` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `title`',
  },
  text: {
    'string.empty': 'Поле `text` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `text`',
  },
  date: {
    'string.empty': 'Поле `date` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `date`',
  },
  source: {
    'string.empty': 'Поле `source` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `source`',
  },
  link: {
    'string.empty': 'Поле `link` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `link`',
  },
  image: {
    'string.empty': 'Поле `link` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `link`',
  },
};

const articleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages(message.keyword),
    title: Joi.string().required().messages(message.title),
    text: Joi.string().required().messages(message.text),
    date: Joi.string().required().messages(message.date),
    source: Joi.string().required().messages(message.source),
    link: Joi.string().required().custom(url, 'url validation').messages(message.link),
    image: Joi.string().required().custom(url, 'url validation').messages(message.image),
  }),
});

const articleIdValidation = celebrate({
  params: Joi.object({
    articleId: Joi.objectId().message('`articleId` не может быть меньше 24 символов'),
  }),
});

module.exports = { articleValidation, articleIdValidation };
