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
        responseHandler: (response) =>
          response.status === 200
            ? alert(`Банк создан успешно со статусом: ${response.status}`)
            : alert(
                "неверно заполнены поля, необходимо просмотреть мануалку по заполнению."
              ),
      }),
    }),
    update_bank: builder.mutation({
      query: ({ pk, ...task }) => ({
        url: `bank_tariff/update_bank/${pk}/`,
        method: "PUT",
        body: task,
        responseHandler: (response) =>
          response.status === 200
            ? alert(`Банк обновлен успешно со статусом: ${response.status}`)
            : alert(
                "Банк не обновлен, необходимо просмотреть мануалку по заполнению."
              ),
      }),
    }),
    delete_bank: builder.mutation({
      query: (pk) => ({
        url: `bank_tariff/delete_bank/${pk}/`,
        method: "DELETE",
        responseHandler: (response) =>
          response.status === 204
            ? alert(`Банк удален успешно со статусом: ${response.status}`)
            : alert(
                `Ошибка, необходимо просмотреть мануалку по заполнению${response.status}.`
              ),
      }),
    }),
    add_tariff_manually: builder.mutation({
      query: (data) => ({
        url: `bank_tariff/create_tariff_manually/`,
        method: "POST",
        body: data,
        responseHandler: (response) =>
          response.status === 200
            ? alert(`Uploaded data:
          bank id: ${data["bank_id"]},
          interest rate: ${data["interest_rate"]},
          promo campaign name: ${data["promo_campaign_name"]},
          url: ${data["url"]},
          entry date: ${data["entry_date"]}
          STATUS: ${response.status} (Успешно)
          `)
            : alert(
                "неверно заполнены поля, необходимо просмотреть мануалку по заполнению."
              ),
      }),
    }),
    add_tariff_by_upload_file: builder.mutation({
      query: (data) => ({
        url: `bank_tariff/create_tariff_manually/`,
        method: "POST",
        body: data,
        responseHandler: (response) =>
          alert(`Uploaded data:
          bank id: ${data["bank_id"]},
          interest rate: ${data["interest_rate"]},
          promo campaign name: ${data["promo_campaign_name"]},
          url: ${data["url"]},
          entry date: ${data["entry_date"]}
          STATUS: ${response.status} (Успешно)
          `),
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
        responseHandler: (response) =>
          response.status === 200
            ? alert(`Тариф обновлен успешно со статусом: ${response.status}`)
            : alert(
                "Тариф не обновлен, необходимо просмотреть мануалку по заполнению."
              ),
      }),
    }),
    delete_tariff: builder.mutation({
      query: (entry_id) => ({
        url: `bank_tariff/delete_tariff/${entry_id}/`,
        method: "DELETE",
        responseHandler: (response) =>
          response.status === 204
            ? alert(`Тариф удален успешно со статусом: ${response.status}`)
            : alert(
                `Ошибка, необходимо просмотреть мануалку по заполнению${response.status}.`
              ),
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
  useAdd_tariff_manuallyMutation,
  useGet_tariff_by_entry_idQuery,
  useUpdate_tariffMutation,
  useDelete_tariffMutation,
  useAdd_tariff_by_upload_fileMutation,
} = API;
