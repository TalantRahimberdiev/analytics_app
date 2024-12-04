import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Group,
  TextInput,
  Badge,
  Divider,
  Select,
  SimpleGrid,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  useGet_campaign_by_campaign_noQuery,
  useUpdate_campaignMutation,
} from '../../rtk/APIS/campaign_api';

import {
  useCustomer_campaignQuery,
  useCustomer_campaign_by_pkQuery,
} from '../../rtk/APIS/customer_api';

export default function UpdateCampaign() {
  const navigate = useNavigate();
  const { pk } = useParams();
  const { campaign_no } = useParams();
  const { data } = useCustomer_campaignQuery();
  const customer_by_pk = useCustomer_campaign_by_pkQuery(pk);
  const { refetch } = useGet_campaign_by_campaign_noQuery(campaign_no);

  const list_select_customers =
    data && data.map((item) => String(item['customer_no']));

  const [targetCustomer_id, setTargetCustomer_id] = useState('');
  const current_campaign = useGet_campaign_by_campaign_noQuery(campaign_no);
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [text, setText] = useState('');
  const [extra_comments, setExtra_comments] = useState('');
  const [customer_no, setCustomer_no] = useState('');

  const [update_campaign] = useUpdate_campaignMutation();

  const update = async () => {
    const task = {
      campaign_no: +campaign_no,
      targetCustomer_id,
      start_date,
      end_date,
      text,
      extra_comments,
    };
    await update_campaign(task);
  };

  useEffect(() => {
    setStart_date(
      (current_campaign.data && current_campaign.data[0]['start_date']) || '',
    );
    setEnd_date(
      (current_campaign.data && current_campaign.data[0]['end_date']) || '',
    );
    setText((current_campaign.data && current_campaign.data[0]['text']) || '');
    setExtra_comments(
      (current_campaign.data && current_campaign.data[0]['extra_comments']) ||
        '',
    );
    setCustomer_no(
      customer_by_pk.data &&
        String(customer_by_pk.data['customer_campaigns'][0][0]['customer_no']),
    );
  }, [current_campaign]);

  useEffect(() => {
    setTargetCustomer_id(
      data && data.find((item) => item.customer_no === Number(customer_no))?.id,
    );
  }, [customer_no]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Update campaign:{' '}
            {current_campaign.data && current_campaign.data[0]['campaign_no']}
          </Badge>
        }
        labelPosition="center"
      />
      {data && (
        <Select
          withAsterisk
          label="List of the customers"
          placeholder="Pick a customer"
          value={customer_no}
          defaultValue={
            customer_by_pk.data &&
            String(
              customer_by_pk.data['customer_campaigns'][0][0]['customer_no'],
            )
          }
          data={list_select_customers}
          onChange={(event) => {
            setCustomer_no(event);
          }}
        />
      )}
      <SimpleGrid cols={2} spacing="lg">
        <div>
          <TextInput
            value={start_date}
            type="date"
            label="Start date"
            placeholder="Date input"
            onChange={(e) => setStart_date(e.target.value)}
          />{' '}
        </div>
        <div>
          <TextInput
            value={end_date}
            type="date"
            label="End date"
            placeholder="Date input"
            onChange={(e) => {
              setEnd_date(e.target.value);
              console.log(e.target.value);
            }}
          />{' '}
        </div>
        <div>
          <TextInput
            onChange={(event) => setText(event.target.value)}
            withAsterisk
            defaultValue={text}
            label="Text"
            placeholder="enter text"
          />
        </div>
        <div>
          {' '}
          <TextInput
            onChange={(event) => setExtra_comments(event.target.value)}
            defaultValue={extra_comments}
            withAsterisk
            label="Extra comments"
            placeholder="extra comments"
          />
        </div>
      </SimpleGrid>
      <Group justify="flex-end" mt="md">
        <Button
          variant="filled"
          color="teal"
          type="submit"
          onClick={() => {
            update();
            navigate(`/customer_campaign/`);
          }}
        >
          Update campaign
        </Button>
      </Group>
    </>
  );
}
