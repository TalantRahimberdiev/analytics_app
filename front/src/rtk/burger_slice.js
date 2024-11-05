import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opened: false,
};

export const burger_slice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    changeBurger: (state) => {
      state.opened = !state.opened;
    },
  },
});

export const { changeBurger } = burger_slice.actions;
export default burger_slice.reducer;
