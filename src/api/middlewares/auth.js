const { tokenVerify } = require('../services/tokenService');
const { tokenValidation } = require('../utils/validateFunctions');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const userId = tokenVerify(authorization);
    tokenValidation(userId);

    req.user = userId;
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
