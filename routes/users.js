const route = require('express').Router();

const { getUserMe, logout } = require('../controllers/users');

route.get('/users/me', getUserMe);
route.post('/logout', logout);

module.exports = route;
