const { createUser, findUserByEmail } = require('../models/users.models');
const { tokenGenerate } = require('./tokenService');
const { entriesValidation, loginValidations,
  userNpasswordValidate } = require('../utils/validateFunctions');

const createUserService = async ({ name, email, password }) => {
  await entriesValidation(name, email, password);

  const userCreated = await createUser(name, email, password);
  return { user: userCreated };
};

const findUserService = async ({ email, password }) => {
  loginValidations(email, password);
  const user = await findUserByEmail(email);
  userNpasswordValidate(user, password);

  const { password: _password, ...userLessPass } = user;
  const tokenId = tokenGenerate(userLessPass);
  return { token: tokenId };
};

module.exports = {
  createUserService,
  findUserService,
};
