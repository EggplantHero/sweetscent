import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "ui",
  initialState: {
    mode: "spring"
  },
  reducers: {
    changeMode: (ui, action) => {
      ui.mode = action.payload
    },
  },
});

export const getMode = createSelector(
  (state) => state.ui,
  (ui) => ui.mode
);

export default slice.reducer;
export const { changeMode } = slice.actions;
