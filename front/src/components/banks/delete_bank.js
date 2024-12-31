import { useNavigate, useParams } from 'react-router-dom';
import { Button, Group, TextInput, Badge, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  useBank_tariff_by_pkQuery,
  useDelete_bankMutation,
} from '../../rtk/APIS/bank_api';

export default function DeleteBank() {
  const { pk } = useParams();
  const { data } = useBank_tariff_by_pkQuery(pk);
  const { refetch } = useBank_tariff_by_pkQuery(pk);
  const navigate = useNavigate();
  const [bankName, setBankName] = useState(
    (data && data['loan'][1][0]['title']) || 'title',
  );

  const [deleteBank] = useDelete_bankMutation();

  const removeBank = async () => {
    await deleteBank(pk);
  };

  useEffect(() => {
    setBankName((data && data['loan'][1][0]['title']) || '');
    refetch();
  }, [data]);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Delete bank
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
            removeBank(pk);
            navigate(`/bank_tariff/`);
          }}
        >
          Delete bank
        </Button>
      </Group>
    </>
  );
}
