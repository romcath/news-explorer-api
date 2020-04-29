const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const errorHandler = require('./middlewares/error-handler');
const auth = require('./middlewares/auth');
const routes = require('./routes/index');
const { PORT, DATABASE } = require('./configuration/config');
const { createUser, login } = require('./controllers/users');
const { createUserValidation, loginUserValidation } = require('./validation/user-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rate-limiter');

const app = express();

app.use(helmet());
app.use(limiter);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginUserValidation, login);

app.use(auth);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
