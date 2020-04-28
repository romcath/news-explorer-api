const route = require('express').Router();

const { createArticle } = require('../controllers/articles');

route.post('/articles', createArticle);

module.exports = route;
