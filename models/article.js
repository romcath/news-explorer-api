const mongoose = require('mongoose');
const validator = require('validator');

const { ARTICLE_IMAGE_INCORRECT, ARTICLE_LINK_INCORRECT } = require('../configuration/constants');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [validator.isURL, ARTICLE_LINK_INCORRECT],
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, ARTICLE_IMAGE_INCORRECT],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
  },
});

articleSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};

module.exports = mongoose.model('article', articleSchema);
