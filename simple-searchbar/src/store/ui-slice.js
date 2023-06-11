import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null, isLoadingItems: true },
  reducers: {
    setLoadingState(state, action) {
      state.isLoadingItems = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
