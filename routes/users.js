const route = require('express').Router();

const { getUserMe } = require('../controllers/users');

route.get('/users/me', getUserMe);

module.exports = route;
