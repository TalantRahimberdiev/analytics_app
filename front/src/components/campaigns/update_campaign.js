import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Group,
  TextInput,
  Badge,
  Divider,
  SimpleGrid,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  useGet_campaign_by_campaign_noQuery,
  useUpdate_campaignMutation,
} from '../../rtk/APIS/campaign_api';
import { useSelector } from 'react-redux';

export default function UpdateCampaign() {
  const navigate = useNavigate();
  const { campaign_no } = useParams();
  const { data } = useGet_campaign_by_campaign_noQuery(campaign_no);

  const [customer_id, setCustomer_id] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [text, setText] = useState('');
  const [extra_comments, setExtra_comments] = useState('');
  const employee_username = useSelector(
    (state) => state.authentication.username,
  );

  const [update_campaign] = useUpdate_campaignMutation();

  const update = async () => {
    const task = {
      campaign_no: +campaign_no,
      customer_id,
      start_date,
      end_date,
      text,
      extra_comments,
      employee_username: employee_username,
    };
    await update_campaign(task);
  };
  const { refetch } = useGet_campaign_by_campaign_noQuery(campaign_no);

  useEffect(() => {
    refetch();
  }, [campaign_no]);

  useEffect(() => {
    setCustomer_id((data && String(data[0]['customer_id'])) || '');
    setStart_date((data && data[0]['start_date']) || '');
    setEnd_date((data && data[0]['end_date']) || '');
    setText((data && data[0]['text']) || '');
    setExtra_comments((data && data[0]['extra_comments']) || '');
  }, [data]);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Update campaign: {data && data[0]['campaign_no']}
          </Badge>
        }
        labelPosition="center"
      />
      <SimpleGrid cols={2} spacing="lg">
        <div>
          <TextInput
            value={customer_id}
            label="Customer id"
            placeholder="customer id"
            onChange={(e) => setCustomer_id(e.target.value)}
          />{' '}
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
