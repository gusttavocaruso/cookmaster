const joi = require('joi');
const errorHandle = require('./errorHandle');
const { findUserByEmail } = require('../models/users.models');

const userValidations = async (name, email, password) => {
  const isValidEmail = joi.string().email().required();
  const { error } = isValidEmail.validate(email);

  if (!name || !password || error) {
    throw errorHandle(400, 'Invalid entries. Try again.');
  }

  const userMail = await findUserByEmail(email);
  if (userMail) throw errorHandle(409, 'Email already registered');
};

module.exports = {
  userValidations,
};
