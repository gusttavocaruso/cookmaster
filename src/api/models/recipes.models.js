const { ObjectId } = require('mongodb');
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

const getRecipeById = async (id) => {
  const db = await connect();
  const recipe = await db
    .collection('recipes')
    .findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};
