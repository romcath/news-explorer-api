const Article = require('../models/article');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// Возвращает все сохранённые пользователем статьи
const getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then(article => res.send(article))
    .catch(next);
};

// Cоздаёт статью
const createArticle = (req, res, next) => {
  const { _id: owner } = req.user;

  Article.create({ ...req.body, owner })
    .then(article => res.status(201).send(article))
    .catch(next);
};

// Удаляет сохранённую статью по _id
const deleteArticleID = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(new NotFoundError(`Нет статьи с id ${req.params.articleId}`))
    .then(article => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить статью, которую не сохраняли');
      }
      return Article.deleteOne(article)
        .then(() => res.send(article));
    })
    .catch(next);
};

module.exports = {
  createArticle,
  getAllArticles,
  deleteArticleID,
};
