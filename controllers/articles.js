const Article = require('../models/article');

// Cоздаёт статью
const createArticle = (req, res, next) => {
  const { _id: owner } = req.user;

  Article.create({ ...req.body, owner })
    .then(article => res.status(201).send(article))
    .catch(next);
};

module.exports = {
  createArticle,
};
