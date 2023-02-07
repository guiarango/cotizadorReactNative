import { ingredientsActions } from "../slices/ingredients-slice";

export const createNewIngredient = (ingredientData) => {
  return (dispatch) => {
    dispatch(ingredientsActions.addIngredientsToList(ingredientData));
  };
};
