import { emptySplitApi } from './basic_api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    add_campaign_manually: builder.mutation({
      query: (data) => ({
        url: `customer_campaign/create_campaign_manually/`,
        method: 'POST',
        body: data,
        responseHandler: (response) =>
          response.status === !200 &&
          alert(`Загружаемые данные:
          неверно заполнены поля, необходимо просмотреть мануалку по заполнению.
          customer_id:${data['customer_id']},
          start_date: ${data['start_date']},
          end_date: ${data['end_date']},
          text: ${data['text']},
          extra_comments: ${data['extra_comments']},
          target customer id: ${data['targetCustomer_id']}
          STATUS: ${response.status} (Успешно)
          `),
      }),
    }),
    add_campaign_by_upload_file: builder.mutation({
      query: (data) => ({
        url: `customer_campaign/create_campaign_manually/`,
        method: 'POST',
        body: data,
        responseHandler: (response) =>
          response.status === !200 &&
          alert(`Загружаемые данные:
          неверно заполнены поля, необходимо просмотреть мануалку по заполнению.
          customer_id:${data['customer_id']},
          start_date: ${data['start_date']},
          end_date: ${data['end_date']},
          text: ${data['text']},
          extra_comments: ${data['extra_comments']},
          target customer id: ${data['targetCustomer_id']}
          STATUS: ${response.status} (Успешно)
          `),
      }),
    }),
    get_list_campaign: builder.query({
      query: () => `customer_campaign/get_list_campaigns/`,
    }),
    get_campaign_by_campaign_no: builder.query({
      query: (campaign_no) =>
        `customer_campaign/get_campaign_by_campaign_no/${campaign_no}/`,
    }),
    update_campaign: builder.mutation({
      query: ({ campaign_no, ...task }) => ({
        url: `customer_campaign/update_campaign/${campaign_no}/`,
        method: 'PUT',
        body: task,
        responseHandler: (response) =>
          response.status === !200 &&
          alert(
            'Кампания не обновлена, необходимо просмотреть мануалку по заполнению.',
          ),
      }),
    }),
    delete_campaign: builder.mutation({
      query: (campaign_no) => ({
        url: `customer_campaign/delete_campaign/${campaign_no}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdd_campaign_manuallyMutation,
  useAdd_campaign_by_upload_fileMutation,
  useGet_campaign_by_campaign_noQuery,
  useUpdate_campaignMutation,
  useDelete_campaignMutation,
  useGet_list_campaignQuery,
} = extendedApi;
