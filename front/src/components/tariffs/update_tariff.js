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
  useGet_tariff_by_entry_idQuery,
  useUpdate_tariffMutation,
} from '../../rtk/APIS/tariff_api';

import { useBank_tariffQuery } from '../../rtk/APIS/bank_api';
import { useSelector } from 'react-redux';

export default function UpdateTariff() {
  const navigate = useNavigate();
  const { pk } = useParams();
  const { entry_id } = useParams();
  const { data } = useBank_tariffQuery();
  const { refetch } = useGet_tariff_by_entry_idQuery(entry_id);
  const list_select_banks =
    data && data.map((item) => item['id'] + ' ' + item['title']);

  const current_tariff = useGet_tariff_by_entry_idQuery(entry_id);

  const [bank_id, setBank_id] = useState(pk);
  const [title, setTitle] = useState(
    list_select_banks &&
      list_select_banks.find((item) => parseInt(item) === parseInt(pk)),
  );
  const [interest_rate, setInterest_rate] = useState(null);
  const [promo_campaign_name, setPromo_campaign_name] = useState('');
  const [url, setUrl] = useState('');
  const [entry_date, setEntry_date] = useState('');

  const [update_tariff] = useUpdate_tariffMutation();
  const employee_username = useSelector(
    (state) => state.authentication.username,
  );

  const update = async () => {
    const task = {
      entry_id,
      bank_id,
      interest_rate,
      promo_campaign_name,
      url,
      entry_date,
      employee_username: employee_username,
    };
    await update_tariff(task);
  };

  useEffect(() => {
    setInterest_rate(
      (current_tariff.data && current_tariff.data[0]['interest_rate']) || null,
    );
    setPromo_campaign_name(
      (current_tariff.data && current_tariff.data[0]['promo_campaign_name']) ||
        null,
    );
    setUrl((current_tariff.data && current_tariff.data[0]['url']) || null);
    setEntry_date(
      (current_tariff.data && current_tariff.data[0]['entry_date']) || null,
    );
  }, [current_tariff]);

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
            Update tariff:{' '}
            {current_tariff.data && current_tariff.data[0]['entry_id']}
          </Badge>
        }
        labelPosition="center"
      />
      {data && (
        <Select
          withAsterisk
          label="List of the banks"
          placeholder="Pick a bank"
          value={title}
          defaultValue={
            list_select_banks &&
            list_select_banks.find((item) => parseInt(item) === parseInt(pk))
          }
          data={list_select_banks}
          onChange={(event) => {
            setBank_id(parseInt(event));
            setTitle(event);
          }}
        />
      )}
      <SimpleGrid cols={2} spacing="lg">
        <div>
          {' '}
          <TextInput
            onChange={(event) => setInterest_rate(event.target.value)}
            withAsterisk
            defaultValue={interest_rate}
            label="Interest rate"
            placeholder="enter interest rate"
          />
        </div>
        <div>
          <TextInput
            onChange={(event) => setPromo_campaign_name(event.target.value)}
            withAsterisk
            defaultValue={promo_campaign_name}
            label="Promo campaign name"
            placeholder="enter promo campaign name"
          />
        </div>
        <div>
          <TextInput
            onChange={(event) => setUrl(event.target.value)}
            withAsterisk
            defaultValue={url}
            label="URL"
            placeholder="enter url"
          />
        </div>
        <div>
          {' '}
          <TextInput
            onChange={(event) => setEntry_date(event.target.value)}
            defaultValue={entry_date}
            withAsterisk
            label="Date"
            placeholder="select date"
            type="date"
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
            navigate(`/bank_tariff/`);
          }}
        >
          Update tariff
        </Button>
      </Group>
    </>
  );
}
