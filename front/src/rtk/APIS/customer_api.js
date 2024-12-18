import { emptySplitApi } from './basic_api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    customer_campaign: builder.query({
      query: () => 'customer_campaign/',
    }),
    customer_campaign_by_pk: builder.query({
      query: (pk) => `customer_campaign/by_pk/${pk}/`,
    }),
    customer_by_pk: builder.query({
      query: (pk) => `customer_campaign/customer_by_pk/${pk}/`,
    }),
    add_customer: builder.mutation({
      query: (data) => ({
        url: 'customer_campaign/create_customer/',
        method: 'POST',
        body: data,
        responseHandler: (response) =>
          response.status === 200
            ? alert(`Клиент создан успешно со статусом: ${response.status}`)
            : alert(
                'неверно заполнены поля, необходимо просмотреть мануалку по заполнению.',
              ),
      }),
    }),
    update_customer: builder.mutation({
      query: ({ pk, ...task }) => ({
        url: `customer_campaign/update_customer/${pk}/`,
        method: 'PUT',
        body: task,
        responseHandler: (response) =>
          response.status === 200
            ? alert(`Клиент обновлен успешно со статусом: ${response.status}`)
            : alert(
                'Клиент не обновлен, необходимо просмотреть мануалку по заполнению.',
              ),
      }),
    }),
    delete_customer: builder.mutation({
      query: (pk) => ({
        url: `customer_campaign/delete_customer/${pk}/`,
        method: 'DELETE',
        responseHandler: (response) =>
          response.status === 204
            ? alert(`Клиент удален успешно со статусом: ${response.status}`)
            : alert(
                `Ошибка, необходимо просмотреть мануалку по заполнению${response.status}.`,
              ),
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCustomer_campaignQuery,
  useCustomer_campaign_by_pkQuery,
  useCustomer_by_pkQuery,
  useAdd_customerMutation,
  useUpdate_customerMutation,
  useDelete_customerMutation,
} = extendedApi;
