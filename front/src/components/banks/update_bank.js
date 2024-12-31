import { useNavigate, useParams } from 'react-router-dom';
import { Button, Group, TextInput, Badge, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  useBank_tariff_by_pkQuery,
  useUpdate_bankMutation,
} from '../../rtk/APIS/bank_api';
import { useSelector } from 'react-redux';

export default function UpdateBank() {
  const { pk } = useParams();
  const { data } = useBank_tariff_by_pkQuery(pk);
  const { refetch } = useBank_tariff_by_pkQuery(pk);

  const employee_username = useSelector(
    (state) => state.authentication.username,
  );

  const navigate = useNavigate();
  const [bankName, setBankName] = useState(
    (data && data['loan'][1][0]['title']) || 'title',
  );

  const [updateBank] = useUpdate_bankMutation();

  const update = async () => {
    const task = {
      pk: pk,
      title: bankName,
      employee_username: employee_username,
    };
    await updateBank(task);
  };

  useEffect(() => {
    setBankName((data && data['loan'][1][0]['title']) || '');
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
            Update bank
          </Badge>
        }
        labelPosition="center"
      />
      <TextInput
        value={bankName}
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
            update();
            navigate(`/bank_tariff/`);
          }}
        >
          update bank
        </Button>
      </Group>
    </>
  );
}
