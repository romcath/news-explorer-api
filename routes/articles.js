const route = require('express').Router();

const { createArticle, getAllArticles } = require('../controllers/articles');
const { articleValidation } = require('../middlewares/article-validation');

route.get('/articles', getAllArticles);
route.post('/articles', articleValidation, createArticle);

module.exports = route;
