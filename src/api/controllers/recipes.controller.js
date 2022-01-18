const { createRecipeServices, getRecipesService,
  getRecipeByIdService } = require('../services/recipes.services');

const recipeCreate = async (req, res, next) => {
  try {
    const recipeData = req.body;
    const userId = req.user;
    const recipeId = await createRecipeServices(recipeData);

    const recipeCreated = {
      recipe: { ...recipeData, userId, _id: recipeId },
    };
    return res.status(201).json(recipeCreated);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const recipesGet = async (_req, res, next) => {
  try {
    const recipes = await getRecipesService();
    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const recipeGetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeByIdService(id);
  
    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  recipeCreate,
  recipesGet,
  recipeGetById,
};
