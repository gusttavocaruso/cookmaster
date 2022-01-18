const { tokenVerify } = require('../services/tokenService');
const { tokenValidation, authorizationValidate,
 } = require('../utils/validateFunctions');

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    authorizationValidate(authorization);

    const userId = tokenVerify(authorization);
    tokenValidation(userId);

    req.user = userId;
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
