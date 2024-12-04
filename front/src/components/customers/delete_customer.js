import { useNavigate, useParams } from 'react-router-dom';
import { Button, Group, TextInput, Badge, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  useCustomer_by_pkQuery,
  useDelete_customerMutation,
} from '../../rtk/APIS/customer_api';

export default function DeleteCustomer() {
  const { pk } = useParams();
  const { data } = useCustomer_by_pkQuery(pk);
  const navigate = useNavigate();
  const [customerNo, setCustomerNo] = useState(
    (data && data[0]['customer_no']) || '',
  );

  const [deleteCustomer] = useDelete_customerMutation();

  const removeCustomer = async () => {
    await deleteCustomer(pk);
  };

  useEffect(() => {
    setCustomerNo((data && data[0]['customer_no']) || '');
  }, [data]);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Delete customer
          </Badge>
        }
        labelPosition="center"
      />
      <TextInput
        value={customerNo}
        onChange={(event) => setCustomerNo(event.target.value)}
        withAsterisk
        label="Customer"
        placeholder="customer no"
      />
      <Group justify="flex-end" mt="md">
        <Button
          variant="filled"
          color="teal"
          type="submit"
          onClick={() => {
            removeCustomer(pk);
            navigate(`/customer_campaign/`);
          }}
        >
          Delete customer
        </Button>
      </Group>
    </>
  );
}
