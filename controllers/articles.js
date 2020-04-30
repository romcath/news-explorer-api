const Article = require('../models/article');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  ARTICLE_NOT_FOUND, ARTICLE_CAN_NOT_DEL, ARTICLE_REMOVED,
} = require('../configuration/constants');

// Возвращает все сохранённые пользователем статьи
const getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.send(article))
    .catch(next);
};

// Cоздаёт статью
const createArticle = (req, res, next) => {
  const { _id: owner } = req.user;

  Article.create({ ...req.body, owner })
    .then((article) => res.status(201).send(article.omitPrivate()))
    .catch(next);
};

// Удаляет сохранённую статью по _id
const deleteArticleID = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .orFail(new NotFoundError(ARTICLE_NOT_FOUND))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(ARTICLE_CAN_NOT_DEL);
      }
      return Article.deleteOne(article)
        .then(() => res.send({ message: ARTICLE_REMOVED }));
    })
    .catch(next);
};

module.exports = {
  createArticle,
  getAllArticles,
  deleteArticleID,
};
