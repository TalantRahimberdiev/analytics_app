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
import { useState } from 'react';
import { useAdd_tariff_manuallyMutation } from '../../rtk/APIS/tariff_api';
import { useSelector } from 'react-redux';

import { useBank_tariffQuery } from '../../rtk/APIS/bank_api';

export default function CreateTariffManually() {
  const navigate = useNavigate();

  const { data } = useBank_tariffQuery();
  const [addTariff] = useAdd_tariff_manuallyMutation();

  const [bank_id, setBank_id] = useState(null);
  const [title, setTitle] = useState('');
  const [interest_rate, setInterest_rate] = useState(null);
  const [promo_campaign_name, setPromo_campaign_name] = useState('');
  const [url, setUrl] = useState('');
  const [entry_date, setEntry_date] = useState('');
  const employee_username = useSelector(
    (state) => state.authentication.username,
  );

  const add = async () => {
    const task = {
      bank_id,
      interest_rate,
      promo_campaign_name,
      url,
      entry_date,
      employee_username: employee_username,
    };
    await addTariff(task);
  };

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Create tariff manually
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
          defaultValue={title}
          data={data.map((item) => `${item.id} ${' '}${item.title}`)}
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
            label="Interest rate"
            placeholder="enter interest rate"
          />
        </div>
        <div>
          <TextInput
            onChange={(event) => setPromo_campaign_name(event.target.value)}
            withAsterisk
            label="Promo campaign name"
            placeholder="enter promo campaign name"
          />
        </div>
        <div>
          <TextInput
            onChange={(event) => setUrl(event.target.value)}
            withAsterisk
            label="URL"
            placeholder="enter url"
          />
        </div>
        <div>
          {' '}
          <TextInput
            onChange={(event) => setEntry_date(event.target.value)}
            value={entry_date}
            withAsterisk
            label="Date"
            placeholder="select date"
            type="date"
            lang="en"
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
            navigate(`/bank_tariff/`);
          }}
        >
          Submit tariff
        </Button>
      </Group>
    </>
  );
}
