import { recipesActions } from "../slices/recipes-slice";

export const createNewRecipe = (recipeData) => {
  return (dispatch) => {
    dispatch(recipesActions.addRecipesToList(recipeData));
  };
};

export const editRecipe = (recipeData) => {
  return (dispatch) => {
    dispatch(recipesActions.editRecipe(recipeData));
  };
};

export const deleteRecipe = (recipeData) => {
  return (dispatch) => {
    dispatch(recipesActions.deleteRecipe(recipeData));
  };
};
