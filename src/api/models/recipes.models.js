const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation });
  return insertedId;
};

module.exports = {
  createRecipe,
};
