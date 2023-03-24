import { recipesActions } from "../slices/recipes-slice";

import {
  getRecipes,
  insertRecipe,
  deleteRecipeFromDB,
  insertIntermediateTableItems,
  deleteRecipeFromIntermediateDB,
} from "../../../DB/index";

export const getRecipesFromDB = () => {
  return async (dispatch) => {
    const result = await getRecipes();
    const items = result.rows._array;

    const recipesArray = items
      .filter(
        (value, index, self) =>
          index === self.findIndex((item) => item.id === value.id)
      )
      .map(function (obj) {
        return { id: obj.id, recipeName: obj.recipeName };
      });

    recipesArray.map((recipe) => {
      recipe.ingredients = [];
      const ingredients = items
        .filter((item) => {
          return recipe.id === item.id;
        })
        .map(function (obj) {
          return {
            ingredientId: obj.ingredientId,
            ingredientQuantity: obj.ingredientQuantity,
            ingredientName: obj.ingredientName,
          };
        });
      recipe.ingredients.push(...ingredients);
    });

    dispatch(recipesActions.setRecipesToListByBD(recipesArray));
  };
};

export const createNewRecipe = (recipeData) => {
  return async (dispatch) => {
    const resultRecipe = await insertRecipe(recipeData.recipeName);
    recipeData.id = resultRecipe.insertId;
    recipeData.ingredients.map(async (ingredient) => {
      const id = recipeData.id;
      const ingredientId = ingredient.ingredientId;
      const ingredientQuantity = ingredient.ingredientQuantity;

      return await insertIntermediateTableItems(
        id,
        ingredientId,
        ingredientQuantity
      );
    });

    dispatch(recipesActions.addRecipesToList(recipeData));
  };
};

export const editRecipe = (recipeData) => {
  return (dispatch) => {
    dispatch(recipesActions.editRecipe(recipeData));
  };
};

export const updateIngredientsOnIntermediateDB = (recipeData) => {
  return async (dispatch) => {
    await deleteRecipeFromIntermediateDB(recipeData);

    recipeData.ingredients.map(async (ingredient) => {
      const id = recipeData.id;
      const ingredientId = ingredient.ingredientId;
      const ingredientQuantity = ingredient.ingredientQuantity;

      return await insertIntermediateTableItems(
        id,
        ingredientId,
        ingredientQuantity
      );
    });

    dispatch(recipesActions.editRecipe(recipeData));
  };
};

export const deleteRecipe = (recipeData) => {
  return async (dispatch) => {
    await deleteRecipeFromDB(recipeData);
    await deleteRecipeFromIntermediateDB(recipeData);
    dispatch(recipesActions.deleteRecipe(recipeData));
  };
};
