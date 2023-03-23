import { ingredientsActions } from "../slices/ingredients-slice";

import {
  getIngredients,
  insertIngredient,
  deleteIngredientFromDB,
  updateIngredient,
} from "../../../DB/index";

export const getIngredientsFromDB = () => {
  return async (dispatch) => {
    const result = await getIngredients();

    const ingredientsArray = [];
    result.rows._array.forEach(function (value, key) {
      ingredientsArray.push({ id: key, ...value });
    });

    dispatch(ingredientsActions.setIngredientsToListByBD(ingredientsArray));
  };
};

export const createNewIngredient = (ingredientData) => {
  return async (dispatch) => {
    const {
      ingredientName,
      ingredientBrand,
      ingredientMeasurementUnit,
      ingredientQuantity,
      ingredientCost,
      ingredientCostPerMeasure,
      ingredientCategory,
    } = ingredientData;

    const result = await insertIngredient(
      ingredientName,
      ingredientBrand,
      ingredientMeasurementUnit,
      ingredientQuantity,
      ingredientCost,
      ingredientCostPerMeasure,
      ingredientCategory
    );

    dispatch(
      ingredientsActions.addIngredientsToList({
        id: result.insertId,
        ingredientName,
        ingredientBrand,
        ingredientMeasurementUnit,
        ingredientQuantity,
        ingredientCost,
        ingredientCostPerMeasure,
        ingredientCategory,
      })
    );
  };
};

export const editIngredient = (ingredientData) => {
  return async (dispatch) => {
    const {
      id,
      ingredientName,
      ingredientBrand,
      ingredientMeasurementUnit,
      ingredientQuantity,
      ingredientCost,
      ingredientCostPerMeasure,
      ingredientCategory,
    } = ingredientData;

    await updateIngredient(
      id,
      ingredientName,
      ingredientBrand,
      ingredientMeasurementUnit,
      ingredientQuantity,
      ingredientCost,
      ingredientCostPerMeasure,
      ingredientCategory
    );

    dispatch(ingredientsActions.editIngredientsFromList(ingredientData));
  };
};

export const deleteIngredient = (ingredientId) => {
  return async (dispatch) => {
    const result = await deleteIngredientFromDB(ingredientId);
    dispatch(ingredientsActions.deleteIngredientsFromList(ingredientId));
  };
};
