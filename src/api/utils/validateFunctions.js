const joi = require('@hapi/joi');
const errorHandle = require('./errorHandle');
const { findUserByEmail } = require('../models/users.models');

const emailAlreadyExists = async (email) => {
  const userMail = await findUserByEmail(email);
  if (userMail) throw errorHandle(409, 'Email already registered');
};

const userEntriesValidation = async (name, email, password) => {
  const isValidEmail = joi.string().email().required();
  const { error } = isValidEmail.validate(email);
  if (!name || !password || error) {
    throw errorHandle(400, 'Invalid entries. Try again.');
  }
  await emailAlreadyExists(email);
};

const recipeEntriesValidation = async (name, ingredients, preparation) => {
  const recipeSchema = joi.object({
    name: joi.string().required(),
    ingredients: joi.string().required(),
    preparation: joi.string().required(),
  });

  const { error } = recipeSchema.validate({ name, ingredients, preparation });
  if (error) throw errorHandle(400, 'Invalid entries. Try again.');
};

const loginValidations = (email, pss) => {
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    pss: joi.string().required(),
  });

  const { error } = loginSchema.validate({ email, pss });
  if (error) throw errorHandle(401, 'All fields must be filled');
};

const userNpasswordValidate = (uss, pss) => {
  if (!uss || uss.password !== pss) {
    throw errorHandle(401, 'Incorrect username or password');
  }
};

const tokenValidation = (token) => {
  if (!token) throw errorHandle(401, 'jwt malformed');
};

module.exports = {
  userEntriesValidation,
  loginValidations,
  userNpasswordValidate,
  tokenValidation,
  recipeEntriesValidation,
};
