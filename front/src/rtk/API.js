import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    entry: builder.query({
      query: () => "entry/",
    }),
    bank_tariff: builder.query({
      query: () => "bank_tariff/",
    }),
    bank_tariff_by_pk: builder.query({
      query: (pk) => `bank_tariff/${pk}/`,
    }),
    add_bank: builder.mutation({
      query: (data) => ({
        url: "bank_tariff/create_bank/",
        method: "POST",
        body: data,
      }),
    }),
    update_bank: builder.mutation({
      query: ({ pk, ...task }) => ({
        url: `bank_tariff/update_bank/${pk}/`,
        method: "PUT",
        body: task,
      }),
    }),
    delete_bank: builder.mutation({
      query: (pk) => ({
        url: `bank_tariff/delete_bank/${pk}/`,
        method: "DELETE",
      }),
    }),
    add_tariff: builder.mutation({
      query: (data) => ({
        url: `bank_tariff/create_tariff/`,
        method: "POST",
        body: data,
      }),
    }),
    get_tariff_by_entry_id: builder.query({
      query: (entry_id) => `bank_tariff/get_tariff_by_entry_id/${entry_id}/`,
    }),
    update_tariff: builder.mutation({
      query: ({ entry_id, ...task }) => ({
        url: `bank_tariff/update_tariff/${entry_id}/`,
        method: "PUT",
        body: task,
      }),
    }),
    delete_tariff: builder.mutation({
      query: (entry_id) => ({
        url: `bank_tariff/delete_tariff/${entry_id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useBank_tariffQuery,
  useBank_tariff_by_pkQuery,
  useEntryQuery,
  useAdd_bankMutation,
  useUpdate_bankMutation,
  useDelete_bankMutation,
  useAdd_tariffMutation,
  useGet_tariff_by_entry_idQuery,
  useUpdate_tariffMutation,
  useDelete_tariffMutation,
} = API;
