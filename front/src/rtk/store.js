import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "./API";
import reducer_1 from "./slice_1";

export const store = configureStore({
  reducer: {
    reducer_1: reducer_1,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

setupListeners(store.dispatch);
