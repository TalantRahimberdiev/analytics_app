import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "./API";
import burger_reducer from "./burger_slice";
import authentication_reducer from "./authentication_slice";

export const store = configureStore({
  reducer: {
    burger: burger_reducer,
    authentication: authentication_reducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

setupListeners(store.dispatch);
