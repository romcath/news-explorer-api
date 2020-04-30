const route = require('express').Router();

const { error } = require('../controllers/error');

route.all('*', error);

module.exports = route;
