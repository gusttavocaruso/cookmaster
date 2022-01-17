const { createUser } = require('../models/users.models');
const { userValidations } = require('../utils/validateFunctions');

const createUserService = async ({ name, email, password }) => {
  await userValidations(name, email, password);

  const userCreated = await createUser(name, email, password);
  return { user: userCreated };
};

module.exports = {
  createUserService,
};
