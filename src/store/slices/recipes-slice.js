import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
//[{name, ingredients:[{recipeName, ingredients} ] }]

const recipesList = createSlice({
  name: "recipesList",
  initialState: initialState,
  reducers: {
    setRecipesToListByBD(state, action) {
      const recipes = action.payload;
      return recipes;
    },

    addRecipesToList(state, action) {
      const newRecipe = action.payload;
      const recipeExists = state.find(
        (recipe) => recipe.recipeName === newRecipe.recipeName
      );

      if (!recipeExists) {
        state.push(newRecipe);
      }
    },

    editRecipe(state, action) {
      const recipeId = action.payload.id;
      const ingredients = action.payload.ingredients;
      const recipeItem = state.find((recipe) => recipe.id === recipeId);
      recipeItem.ingredients = ingredients;
    },

    deleteRecipe(state, action) {
      const recipeId = action.payload.id;
      return state.filter((recipe) => recipe.id !== recipeId);
    },
  },
});

export const recipesActions = recipesList.actions;

export default recipesList;
