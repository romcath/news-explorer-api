const route = require('express').Router();

const routesUsers = require('./users');
const routesArticles = require('./articles');
const routeError = require('./error');

route.use(routesUsers);
route.use(routesArticles);
route.use(routeError);

module.exports = route;
