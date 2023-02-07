import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
//[{name, brand, unit measure, quantity, cost, unit cost, photo }]

const ingredientsList = createSlice({
  name: "ingredientsList",
  initialState: initialState,
  reducers: {
    addIngredientsToList(state, action) {
      const newItem = action.payload;
      const itemExists = state.find(
        (ingredient) => ingredient.ingredientName === newItem.ingredientName
      );

      if (!itemExists) {
        state.push(newItem);
      }
    },
  },
});

export const ingredientsActions = ingredientsList.actions;

export default ingredientsList;
