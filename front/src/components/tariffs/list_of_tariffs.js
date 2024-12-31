import { useParams, useNavigate } from 'react-router-dom';
import { useBank_tariff_by_pkQuery } from '../../rtk/APIS/bank_api';
import { Divider, Badge, Group, Table } from '@mantine/core';
import uuid from 'react-uuid';
import { BsFillPencilFill, BsTrash } from 'react-icons/bs';
import { useEffect } from 'react';

export default function ListTariffs() {
  const { pk } = useParams();
  const { data } = useBank_tariff_by_pkQuery(pk);
  const navigate = useNavigate();
  const { refetch } = useBank_tariff_by_pkQuery(pk);
  useEffect(() => refetch(), []);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color={'dark'} variant="filled">
            {data && data['loan'][1][0]['title']}
          </Badge>
        }
        labelPosition="center"
      />
      {data && (
        <>
          <Group position="apart" mt="xs" mb="xs">
            <Badge
              color="green"
              variant="light"
              style={{ textDecoration: 'underline' }}
              onClick={() => navigate(`/create_tariff_manually/`)}
            >
              Create tariff manually
            </Badge>
            <Badge
              color="green"
              variant="light"
              style={{ textDecoration: 'underline' }}
              onClick={() => navigate(`/create_tariff_by_upload_file/`)}
            >
              Create tariff by uploading excel file
            </Badge>
          </Group>

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
                <th>update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {data['loan'][0].map((bb) => (
                <tr key={uuid()}>
                  <td>{bb.entry_id}</td>
                  <td>{bb.bank_id_id}</td>
                  <td>{bb.interest_rate}</td>
                  <td>{bb.promo_campaign_name}</td>
                  <td>{bb.entry_date}</td>
                  <td style={{ textDecoration: 'underline' }}>
                    <a href={bb.url}>link</a>
                  </td>
                  <td onClick={() => navigate(`update_tariff/${bb.entry_id}`)}>
                    <BsFillPencilFill />
                  </td>
                  <td onClick={() => navigate(`delete_tariff/${bb.entry_id}`)}>
                    <BsTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
