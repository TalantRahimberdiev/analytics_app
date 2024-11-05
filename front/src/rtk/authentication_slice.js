import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  isLoggedIn: false,
  formData: {
    email: "",
    password: "",
  },
  isLoading: false,
  successMessage: null,
  error: null,
};

export const authentication_slice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...action.payload };
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUsername,
  setLoggedIn,
  setFormData,
  setIsLoading,
  setSuccessMessage,
  setError,
} = authentication_slice.actions;

export default authentication_slice.reducer;
