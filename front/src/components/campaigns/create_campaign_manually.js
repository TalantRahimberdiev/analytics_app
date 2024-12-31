import { useNavigate } from 'react-router-dom';
import {
  Button,
  Group,
  TextInput,
  Badge,
  Divider,
  SimpleGrid,
} from '@mantine/core';
import { useState } from 'react';
import { useAdd_campaign_manuallyMutation } from '../../rtk/APIS/campaign_api';
import { useSelector } from 'react-redux';

export default function CreateCampaignManually() {
  const navigate = useNavigate();
  const [customer_id, setCustomer_id] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [text, setText] = useState('');
  const [extra_comments, setExtra_comments] = useState('');
  const [add_campaign] = useAdd_campaign_manuallyMutation();
  const employee_username = useSelector(
    (state) => state.authentication.username,
  );

  const add = async () => {
    const task = {
      customer_id,
      start_date,
      end_date,
      text,
      extra_comments,
      employee_username: employee_username,
    };
    await add_campaign(task);
  };

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
      <SimpleGrid cols={2} spacing="lg">
        <div>
          <TextInput
            onChange={(event) => setCustomer_id(event.target.value)}
            defaultValue={customer_id}
            withAsterisk
            label="Customer id"
            placeholder="customer id"
          />
        </div>
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
