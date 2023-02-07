import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
//[{name, ingredients:[{name, brand, unit measure, quantity, cost, unit cost, photo, measure required for recipe, total cost of ingredient for recipe} ] }]

const recipesList = createSlice({
  name: "recipesList",
  initialState: initialState,
  reducers: { addRecipesToList() {} },
});

export const recipesActions = recipesList.actions;

export default recipesList;
