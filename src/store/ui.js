import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "ui",
  initialState: {
    mode: "spring",
    dark: true,
  },
  reducers: {
    changeMode: (ui, action) => {
      ui.mode = action.payload;
    },
    toggleDark: (ui, action) => {
      ui.dark = !ui.dark;
    },
  },
});

export const getMode = createSelector(
  (state) => state.ui,
  (ui) => ui.mode
);
export const getDark = createSelector(
  (state) => state.ui,
  (ui) => ui.dark
);

export default slice.reducer;
export const { changeMode, toggleDark } = slice.actions;
