import { useParams, useNavigate } from 'react-router-dom';
import {
  useDelete_tariffMutation,
  useGet_tariff_by_entry_idQuery,
} from '../../rtk/APIS/tariff_api';
import { Divider, Badge, Group, Table, Button } from '@mantine/core';
import uuid from 'react-uuid';

export default function DeleteTariff() {
  const { entry_id } = useParams();
  const { pk } = useParams();
  const { data } = useGet_tariff_by_entry_idQuery(entry_id);
  const navigate = useNavigate();

  const [deleteTariff] = useDelete_tariffMutation();

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color={'dark'} variant="filled">
            Delete tariff
          </Badge>
        }
        labelPosition="center"
      />
      {data && (
        <>
          <Table
            verticalSpacing="md"
            striped
            highlightOnHover
            withColumnBorders
          >
            <thead>
              <tr>
                <th>entry id</th>
                <th>bank id</th>
                <th>interest rate</th>
                <th>promo</th>
                <th>entry date</th>
                <th>link</th>
              </tr>
            </thead>
            <tbody>
              {data.map((bb) => (
                <tr key={uuid()}>
                  <td>{bb.entry_id}</td>
                  <td>{bb.bank_id_id}</td>
                  <td>{bb.interest_rate}</td>
                  <td>{bb.promo_campaign_name}</td>
                  <td>{bb.entry_date}</td>
                  <td style={{ textDecoration: 'underline' }}>
                    <a href={bb.url}>link</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <Group justify="flex-end" mt="md">
        <Button
          variant="filled"
          color="teal"
          type="submit"
          onClick={() => {
            deleteTariff(entry_id);
            navigate(`/bank_tariff/${pk}`);
          }}
        >
          Delete tariff
        </Button>
      </Group>
    </>
  );
}
