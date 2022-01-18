const express = require('express');
const auth = require('../middlewares/auth');

const { userCreate, logIN } = require('../controllers/users.controller');
const { recipeCreate, recipesGet } = require('../controllers/recipes.controller');

const router = express.Router();

router.post('/users', userCreate);
router.post('/login', logIN);

router.post('/recipes', auth, recipeCreate);
router.get('/recipes', recipesGet);

module.exports = router;
