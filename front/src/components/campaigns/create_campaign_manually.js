import { useNavigate } from 'react-router-dom';
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
import { useAdd_campaign_manuallyMutation } from '../../rtk/APIS/campaign_api';
import { useCustomer_campaignQuery } from '../../rtk/APIS/customer_api';

export default function CreateCampaignManually() {
  const navigate = useNavigate();
  const { data } = useCustomer_campaignQuery();
  const list_select_customers =
    data && data.map((item) => String(item['customer_no']));
  const [targetCustomer_id, setTargetCustomer_id] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [text, setText] = useState('');
  const [extra_comments, setExtra_comments] = useState('');
  const [customer_no, setCustomer_no] = useState('');
  const [add_campaign] = useAdd_campaign_manuallyMutation();

  const add = async () => {
    const task = {
      targetCustomer_id,
      start_date,
      end_date,
      text,
      extra_comments,
    };
    await add_campaign(task);
  };

  useEffect(() => {
    setTargetCustomer_id(
      data && data.find((item) => item.customer_no == customer_no)?.id,
    );
  }, [customer_no]);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Create campaign
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
          defaultValue={''}
          data={list_select_customers}
          onChange={(event) => setCustomer_no(event)}
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
            add();
            navigate(`/customer_campaign/`);
          }}
        >
          Add campaign
        </Button>
      </Group>
    </>
  );
}
