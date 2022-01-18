const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation });
  return insertedId;
};

const getRecipes = async () => {
  const db = await connect();
  const recipes = await db
    .collection('recipes')
    .find().toArray();
  return recipes;
};

module.exports = {
  createRecipe,
  getRecipes,
};
