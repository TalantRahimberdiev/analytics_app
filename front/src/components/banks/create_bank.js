import { useNavigate } from 'react-router-dom';
import { Button, Group, TextInput, Badge, Divider } from '@mantine/core';
import { useState } from 'react';
import { useAdd_bankMutation } from '../../rtk/APIS/bank_api';
import { useSelector } from 'react-redux';

export default function CreateBank() {
  const navigate = useNavigate();
  const [bankName, setBankName] = useState('');

  const [addBank] = useAdd_bankMutation();

  const employee_username = useSelector(
    (state) => state.authentication.username,
  );
  console.log(employee_username);

  const add = async () => {
    const task = {
      title: bankName,
      employee_username: employee_username,
    };
    await addBank(task);
  };

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Create bank
          </Badge>
        }
        labelPosition="center"
      />
      <TextInput
        onChange={(event) => setBankName(event.target.value)}
        withAsterisk
        label="Bank"
        placeholder="name of the bank"
      />
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
          Submit
        </Button>
      </Group>
    </>
  );
}
