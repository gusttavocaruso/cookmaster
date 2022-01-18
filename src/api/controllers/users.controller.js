const { createUserService, findUserService } = require('../services/users.services');

const userCreate = async (req, res, next) => {
  try {
    const newUser = req.body;
    const user = await createUserService(newUser);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const logIN = async (req, res, next) => {
  try {
    const loginData = req.body;
    const token = await findUserService(loginData);
    return res.status(200).json(token);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  userCreate,
  logIN,
};
