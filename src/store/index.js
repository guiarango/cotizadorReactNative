import { configureStore } from "@reduxjs/toolkit";

//Import Slice components
import ingredientsList from "./slices/ingredients-slice";
import recipesList from "./slices/recipes-slice";
import quotationList from "./slices/quotation-slice";

const store = configureStore({
  reducer: {
    ingredientsList: ingredientsList.reducer,
    recipesList: recipesList.reducer,
    quotationList: quotationList.reducer,
  },
});

export default store;
