const express = require('express');
const upp = require('../middlewares/upImage');
const auth = require('../middlewares/auth');

const { userCreate, logIN } = require('../controllers/users.controller');
const { recipeCreate, recipesGet, recipeGetById, recipeDelete, addRecipeImage,
  recipeEdit } = require('../controllers/recipes.controller');

const router = express.Router();

router.post('/users', userCreate);
router.post('/login', logIN);

router.post('/recipes', auth, recipeCreate);
router.get('/recipes', recipesGet);
router.get('/recipes/:id', recipeGetById);
router.put('/recipes/:id', auth, recipeEdit);
router.delete('/recipes/:id', auth, recipeDelete);
router.put('/recipes/:id/image', auth, addRecipeImage, upp);

module.exports = router;
