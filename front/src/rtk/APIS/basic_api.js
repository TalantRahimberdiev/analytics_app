import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptySplitApi = createApi({
  reducerPath: 'extendedApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.30.18.4:8000' }),
  endpoints: () => ({}),
});
