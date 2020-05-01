const route = require('express').Router();

const { notFoundRoute } = require('../controllers/not-found-route');

route.all('*', notFoundRoute);

module.exports = route;
