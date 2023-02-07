import { ingredientsActions } from "../slices/ingredients-slice";

export const createNewIngredient = (ingredientData) => {
  return (dispatch) => {
    // ingredientData.ngredientCostPerMeasure = parseFloat(
    //   ingredientData.ngredientCostPerMeasure
    // );
    dispatch(ingredientsActions.addIngredientsToList(ingredientData));
  };
};

export const editIngredient = (ingredientData) => {
  return (dispatch) => {
    // ingredientData.ngredientCostPerMeasure = parseFloat(
    //   ingredientData.ngredientCostPerMeasure
    // );
    dispatch(ingredientsActions.editIngredientsFromList(ingredientData));
  };
};

export const deleteIngredient = (ingredientId) => {
  return (dispatch) => {
    // ingredientData.ngredientCostPerMeasure = parseFloat(
    //   ingredientData.ngredientCostPerMeasure
    // );
    dispatch(ingredientsActions.deleteIngredientsFromList(ingredientId));
  };
};
