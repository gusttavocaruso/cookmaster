const jwt = require('jsonwebtoken');

const API_SECRET = '321654987@G';
const JWT_CONFIG = { expiresIn: '10d', algorithm: 'HS256' };

const tokenGenerate = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

module.exports = {
  tokenGenerate,
};
