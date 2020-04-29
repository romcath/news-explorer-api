const route = require('express').Router();

const routesUsers = require('./users');
const routesArticles = require('./articles');

route.use(routesUsers);
route.use(routesArticles);

module.exports = route;
