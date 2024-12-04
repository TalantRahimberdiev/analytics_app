import { useCustomer_campaignQuery } from '../../rtk/APIS/customer_api';
import { Badge, Table, Divider, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill, BsTrash } from 'react-icons/bs';
import uuid from 'react-uuid';
import { useEffect } from 'react';

export default function ListCustomers() {
  const { data } = useCustomer_campaignQuery();
  const navigate = useNavigate();
  const { refetch } = useCustomer_campaignQuery();

  useEffect(() => refetch(), []);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            List of customers
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
              onClick={() => navigate(`/create_customer/`)}
            >
              create customer
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
                <th>customer no</th>
                <th>update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((bb) => (
                <tr key={uuid()}>
                  <td>{bb.id}</td>
                  <td
                    onClick={() => navigate(`/customer_campaign/${bb.id}`)}
                    style={{ textDecoration: 'underline' }}
                  >
                    {bb.customer_no}
                  </td>
                  <td onClick={() => navigate(`update_customer/${bb.id}`)}>
                    <BsFillPencilFill />
                  </td>
                  <td onClick={() => navigate(`delete_customer/${bb.id}`)}>
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
