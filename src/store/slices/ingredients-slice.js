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
    editIngredientsFromList(state, action) {
      const id = action.payload.id;
      const newState = [...state];
      const itemId = newState.findIndex((ingredient) => ingredient.id === id);

      state[itemId] = action.payload;
    },

    deleteIngredientsFromList(state, action) {
      const id = action.payload.id;
      const newState = [...state];
      const itemId = newState.findIndex((ingredient) => ingredient.id === id);

      delete state.splice(itemId, 1);
    },
  },
});

export const ingredientsActions = ingredientsList.actions;

export default ingredientsList;
