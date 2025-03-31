import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptySplitApi = createApi({
  reducerPath: 'extendedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: () => ({}),
});
