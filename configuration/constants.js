const NOT_FOUND = 'Запрашиваемый ресурс не найден';

const ARTICLE_NOT_FOUND = 'Нет статьи с таким id';
const ARTICLE_REMOVED = 'Статья удалена';
const ARTICLE_CAN_NOT_DEL = 'Вы не можете удалить статью, которую не сохраняли';
const ARTICLE_LINK_INCORRECT = 'Некорректный формат ссылки на статью';
const ARTICLE_IMAGE_INCORRECT = 'Некорректный формат ссылки на иллюстрацию к статье';

const USER_NOT_FOUND = 'Нет пользователя с таким id';
const USER_CAN_NOT_CREATE = 'Ошибка при создании пользователя';
const USER_EMAIL_CONFLICT = 'Электронная почта уже существует';
const USER_EMAIL_INCORRECT = 'Некорректный формат для электронной почты';

const REQUEST_LOGIN = 'Необходима авторизация';
const SERVER_ERROR = 'На сервере произошла ошибка';

const INCORRECT_EMAIL_PASS = 'Неправильные почта или пароль';
const INCORRECT_ID = 'Некорректный формат {#label}';
const INCORRECT_URL = 'Некорректный формат ссылки поля';

const VALIDATION_ERRORS = {
  'string.empty': 'Поле {#label} не может быть пустым',
  'string.min': 'Поле {#label} не может быть меньше {#limit} символов',
  'string.max': 'Поле {#label} не может быть больше {#limit} символов',
  'any.required': 'Отсутствует обязательное поле {#label}',
  'string.email': 'Некорректный формат поля {#label}',
};

module.exports = {
  NOT_FOUND,

  ARTICLE_NOT_FOUND,
  ARTICLE_REMOVED,
  ARTICLE_CAN_NOT_DEL,
  ARTICLE_LINK_INCORRECT,
  ARTICLE_IMAGE_INCORRECT,

  USER_NOT_FOUND,
  USER_CAN_NOT_CREATE,
  USER_EMAIL_CONFLICT,
  USER_EMAIL_INCORRECT,

  REQUEST_LOGIN,
  SERVER_ERROR,

  INCORRECT_EMAIL_PASS,
  INCORRECT_ID,
  INCORRECT_URL,

  VALIDATION_ERRORS,
};
