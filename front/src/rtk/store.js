import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { emptySplitApi } from './APIS/basic_api';
import burger_reducer from './burger_slice';
import authentication_reducer from './authentication_slice';

export const store = configureStore({
  reducer: {
    burger: burger_reducer,
    authentication: authentication_reducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

setupListeners(store.dispatch);
