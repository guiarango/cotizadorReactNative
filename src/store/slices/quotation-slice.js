import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
//[{name, ingredients:[{name, brand, unit measure, quantity, cost, unit cost, photo, measure required for recipe, total cost of ingredient for recipe, selling price} ] }]

const quotationList = createSlice({
  name: "quotationList",
  initialState: initialState,
  reducers: { addQuotationToList() {} },
});

export const quotationActions = quotationList.actions;

export default quotationList;
