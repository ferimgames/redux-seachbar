import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import shoppingListSlice from "./shopping-list-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, shoppingList: shoppingListSlice.reducer },
});

export default store;
