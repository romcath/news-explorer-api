const Article = require('../models/article');

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

module.exports = {
  createArticle,
  getAllArticles,
};
