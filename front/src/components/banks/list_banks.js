import { useBank_tariffQuery } from '../../rtk/APIS/bank_api';
import { Badge, Table, Divider, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill, BsTrash } from 'react-icons/bs';
import uuid from 'react-uuid';
import { useEffect } from 'react';

export default function ListBanks() {
  const { data } = useBank_tariffQuery();
  const navigate = useNavigate();
  const { refetch } = useBank_tariffQuery();

  useEffect(() => refetch(), []);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            List of banks
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
              onClick={() => navigate(`/create_bank/`)}
            >
              create bank
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
                <th>pk</th>
                <th>bank</th>
                <th>update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((bb) => (
                <tr key={uuid()}>
                  <td>{bb.id}</td>
                  <td
                    onClick={() => navigate(`/bank_tariff/${bb.id}`)}
                    style={{ textDecoration: 'underline' }}
                  >
                    {bb.title}
                  </td>
                  <td onClick={() => navigate(`update_bank/${bb.id}`)}>
                    <BsFillPencilFill />
                  </td>
                  <td onClick={() => navigate(`delete_bank/${bb.id}`)}>
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
