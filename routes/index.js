const route = require('express').Router();

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { createUserValidation, loginUserValidation } = require('../validation/user-validation');
const routesUsers = require('./users');
const routesArticles = require('./articles');
const routeError = require('./error');

route.post('/signup', createUserValidation, createUser);
route.post('/signin', loginUserValidation, login);

route.use(auth);
route.use(routesUsers);
route.use(routesArticles);
route.use(routeError);

module.exports = route;
