import { emptySplitApi } from './basic_api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    bank_tariff: builder.query({
      query: () => 'bank_tariff/',
    }),
    bank_tariff_by_pk: builder.query({
      query: (pk) => `bank_tariff/${pk}/`,
    }),
    add_bank: builder.mutation({
      query: (data) => ({
        url: 'bank_tariff/create_bank/',
        method: 'POST',
        body: data,
        responseHandler: (response) =>
          response.status === !200 &&
          alert(
            'неверно заполнены поля, необходимо просмотреть мануалку по заполнению.',
          ),
      }),
    }),
    update_bank: builder.mutation({
      query: ({ pk, ...task }) => ({
        url: `bank_tariff/update_bank/${pk}/`,
        method: 'PUT',
        body: task,
        responseHandler: (response) =>
          response.status === !200 &&
          alert(
            'Банк не обновлен, необходимо просмотреть мануалку по заполнению.',
          ),
      }),
    }),
    delete_bank: builder.mutation({
      query: (pk) => ({
        url: `bank_tariff/delete_bank/${pk}/`,
        method: 'DELETE',
        responseHandler: (response) =>
          response.status === !204 &&
          alert(
            `Ошибка, необходимо просмотреть мануалку по заполнению${response.status}.`,
          ),
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useBank_tariffQuery,
  useBank_tariff_by_pkQuery,
  useAdd_bankMutation,
  useUpdate_bankMutation,
  useDelete_bankMutation,
} = extendedApi;
