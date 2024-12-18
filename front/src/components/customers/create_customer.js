import { useNavigate } from 'react-router-dom';
import { Button, Group, TextInput, Badge, Divider } from '@mantine/core';
import { useState } from 'react';
import { useAdd_customerMutation } from '../../rtk/APIS/customer_api';

export default function CreateCustomer() {
  const navigate = useNavigate();
  const [customerNo, setCustomerNo] = useState('');

  const [addCustomer] = useAdd_customerMutation();

  const add = async () => {
    const task = {
      customer_no: customerNo,
    };
    await addCustomer(task);
  };

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Create customer
          </Badge>
        }
        labelPosition="center"
      />
      <TextInput
        onChange={(event) => setCustomerNo(event.target.value)}
        withAsterisk
        label="Customer NO"
        placeholder="customer no"
      />
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
          Submit
        </Button>
      </Group>
    </>
  );
}
