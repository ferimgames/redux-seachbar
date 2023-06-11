import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  searchQuery: "",
};
const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    replaceItems(state, action) {
      state.items = action.payload.items;
    },
    setQuery(state, action) {
      state.searchQuery = action.payload;
    },
    resetItems(state) {
      state = initialState;
    },
  },
});

export const shoppingListActions = shoppingListSlice.actions;

export default shoppingListSlice;
