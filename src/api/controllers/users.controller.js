const { createUserService } = require('../services/users.services');

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

module.exports = {
  userCreate,
};
