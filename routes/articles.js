const route = require('express').Router();

const { createArticle, getAllArticles, deleteArticleByID } = require('../controllers/articles');
const { articleValidation, articleIdValidation } = require('../validation/article-validation');

route.get('/articles', getAllArticles);
route.post('/articles', articleValidation, createArticle);
route.delete('/articles/:articleId', articleIdValidation, deleteArticleByID);

module.exports = route;
