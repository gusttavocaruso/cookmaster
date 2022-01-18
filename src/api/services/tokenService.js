const jwt = require('jsonwebtoken');

const API_SECRET = '321654987@G';
const JWT_CONFIG = { expiresIn: '10d', algorithm: 'HS256' };

const tokenGenerate = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const tokenVerify = (token) => {
  try {
    const { data } = jwt.verify(token, API_SECRET);
    const { _id, role } = data;
    return { userId: _id, role };
  } catch (error) {
    console.log('varification failure');
    return null;
  }
};

module.exports = {
  tokenGenerate,
  tokenVerify,
};
