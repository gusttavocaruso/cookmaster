const { createRecipeServices } = require('../services/recipes.services');

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

module.exports = {
  recipeCreate,
};
