const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const UnauthorizedError = require('../errors/unauthorized');
const { USER_EMAIL_INCORRECT, INCORRECT_EMAIL_PASS } = require('../config/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, USER_EMAIL_INCORRECT],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError(INCORRECT_EMAIL_PASS))
    .then(user => bcrypt.compare(password, user.password)
      .then(matched => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(INCORRECT_EMAIL_PASS));
        }
        return user;
      }));
};

userSchema.methods.omitPrivate = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.plugin(beautifyUnique);

module.exports = mongoose.model('user', userSchema);
