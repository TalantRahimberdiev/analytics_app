import { emptySplitApi } from './basic_api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    add_tariff_manually: builder.mutation({
      query: (data) => ({
        url: `bank_tariff/create_tariff_manually/`,
        method: 'POST',
        body: data,
        responseHandler: (response) =>
          response.status === 200
            ? console.log('success')
            : alert(`Загружаемые данные:
          неверно заполнены поля, необходимо просмотреть мануалку по заполнению.

          bank id: ${data['bank_id']},
          interest rate: ${data['interest_rate']},
          promo campaign name: ${data['promo_campaign_name']},
          url: ${data['url']},
          entry date: ${data['entry_date']}
          STATUS: ${response.status} (Не успешно.)
          `),
      }),
    }),
    add_tariff_by_upload_file: builder.mutation({
      query: (data) => ({
        url: `bank_tariff/create_tariff_manually/`,
        method: 'POST',
        body: data,
        responseHandler: (response) =>
          response.status === 200
            ? console.log('success')
            : alert(`Загружаемые данные:
          Ошибка при вводе данных. Просмотрите мануалку.

          bank id: ${data['bank_id']},
          interest rate: ${data['interest_rate']},
          promo campaign name: ${data['promo_campaign_name']},
          url: ${data['url']},
          entry date: ${data['entry_date']}
          STATUS: ${response.status} (Не успешно.)
          `),
      }),
    }),
    get_tariff_by_entry_id: builder.query({
      query: (entry_id) => `bank_tariff/get_tariff_by_entry_id/${entry_id}/`,
    }),
    update_tariff: builder.mutation({
      query: ({ entry_id, ...task }) => ({
        url: `bank_tariff/update_tariff/${entry_id}/`,
        method: 'PUT',
        body: task,
        responseHandler: (response) =>
          response.status === 200
            ? console.log('success')
            : alert(
                'Тариф не обновлен, необходимо просмотреть мануалку по заполнению.',
              ),
      }),
    }),
    delete_tariff: builder.mutation({
      query: (entry_id) => ({
        url: `bank_tariff/delete_tariff/${entry_id}/`,
        method: 'DELETE',
        responseHandler: (response) =>
          response.status === 204
            ? console.log('success')
            : alert(
                `Ошибка, необходимо просмотреть мануалку по заполнению${response.status}.`,
              ),
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdd_tariff_manuallyMutation,
  useAdd_tariff_by_upload_fileMutation,
  useGet_tariff_by_entry_idQuery,
  useUpdate_tariffMutation,
  useDelete_tariffMutation,
} = extendedApi;
