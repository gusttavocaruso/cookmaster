const express = require('express');
const { userCreate, logIN } = require('../controllers/users.controller');

const router = express.Router();

router.post('/users', userCreate);
router.post('/login', logIN);

module.exports = router;
