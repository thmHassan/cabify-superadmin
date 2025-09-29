// src/store/commonSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";

const initialState = {
  tabViewScreen: "",
};

const commonSlice = createSlice({
  name: `${SLICE_BASE_NAME}/app`,
  initialState,
  reducers: {
    setTabViewScreen(state, action) {
      state.tabViewScreen = action.payload;
    },
  },
});

export const { setTabViewScreen } = commonSlice.actions;

export default commonSlice.reducer;
