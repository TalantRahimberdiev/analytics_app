import { useNavigate, useParams } from 'react-router-dom';
import { Button, Group, TextInput, Badge, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  useUpdate_customerMutation,
  useCustomer_by_pkQuery,
} from '../../rtk/APIS/customer_api';

export default function UpdateCustomer() {
  const { pk } = useParams();
  const { data } = useCustomer_by_pkQuery(pk);
  const { refetch } = useCustomer_by_pkQuery(pk);

  const navigate = useNavigate();
  const [customerNo, setCustomerNo] = useState(
    (data && data[0]['customer_no']) || '',
  );

  const [updateCustomer] = useUpdate_customerMutation();

  const update = async () => {
    const task = {
      pk: pk,
      customer_no: customerNo,
    };
    await updateCustomer(task);
  };

  useEffect(() => {
    setCustomerNo((data && data[0]['customer_no']) || '');
  }, [data]);

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
            Update customer
          </Badge>
        }
        labelPosition="center"
      />
      <TextInput
        value={customerNo}
        onChange={(event) => setCustomerNo(event.target.value)}
        withAsterisk
        label="Customer"
        placeholder="name of the customer"
      />
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
          update customer
        </Button>
      </Group>
    </>
  );
}
