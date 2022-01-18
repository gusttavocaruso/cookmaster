const { createRecipe, getRecipes } = require('../models/recipes.models');
const { recipeEntriesValidation } = require('../utils/validateFunctions');

const createRecipeServices = async ({ name, ingredients, preparation }) => {
  await recipeEntriesValidation(name, ingredients, preparation);

  const recipeId = await createRecipe(name, ingredients, preparation);
  return recipeId;
};

const getRecipesService = async () => {
  const recipes = await getRecipes();
  return recipes;
};

module.exports = {
  createRecipeServices,
  getRecipesService,
};
