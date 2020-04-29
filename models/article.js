const mongoose = require('mongoose');
const validator = require('validator');

const { ARTICLE_IMAGE_URL, ARTICLE_LINK_URL } = require('../config/constants');

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
    validate: [validator.isURL, ARTICLE_LINK_URL],
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, ARTICLE_IMAGE_URL],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
