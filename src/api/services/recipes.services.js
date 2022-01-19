const { createRecipe, getRecipes, getRecipeById, deleteRecipe,
  editRecipe, addImage } = require('../models/recipes.models');
const { recipeEntriesValidation, recipeValidation,
  idValidation } = require('../utils/validateFunctions');

const createRecipeServices = async ({ name, ingredients, preparation }) => {
  await recipeEntriesValidation(name, ingredients, preparation);

  const recipeId = await createRecipe(name, ingredients, preparation);
  return recipeId;
};

const getRecipesService = async () => {
  const recipes = await getRecipes();
  return recipes;
};

const getRecipeByIdService = async (id) => {
  idValidation(id);
  const recipe = await getRecipeById(id);
  recipeValidation(recipe);
  return recipe;
};

const addImageService = async (id) => {
  const imageRoute = `localhost:3000/src/uploads/${id}.jpeg`;
  await addImage(id, imageRoute);
  return imageRoute;
};

const editRecipeService = async (id, newRecipeFormat) => {
  await editRecipe(id, newRecipeFormat);
};

const deleteRecipeService = async (id) => {
  await deleteRecipe(id);
};

module.exports = {
  createRecipeServices,
  getRecipesService,
  getRecipeByIdService,
  editRecipeService,
  deleteRecipeService,
  addImageService,
};
