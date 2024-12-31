import { useNavigate } from 'react-router-dom';
import { useGet_list_campaignQuery } from '../../rtk/APIS/campaign_api';
import { Divider, Badge, Group, Table } from '@mantine/core';
import uuid from 'react-uuid';
import { BsFillPencilFill, BsTrash } from 'react-icons/bs';
import { useEffect } from 'react';

export default function ListCampaigns() {
  const { data } = useGet_list_campaignQuery();
  const navigate = useNavigate();
  const { refetch } = useGet_list_campaignQuery();

  useEffect(() => refetch(), [data]);

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color={'dark'} variant="filled">
            List of campaigns
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
              onClick={() => navigate(`/create_campaign_manually/`)}
            >
              Create campaign manually
            </Badge>
            <Badge
              color="green"
              variant="light"
              style={{ textDecoration: 'underline' }}
              onClick={() => navigate(`/create_campaign_by_upload_file/`)}
            >
              Create campaign by uploading excel file
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
                <th>campaign pk</th>
                <th>customer id</th>
                <th>start date</th>
                <th>end date</th>
                <th>text</th>
                <th>extra comments</th>
                <th>update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((bb) => (
                <tr key={uuid()}>
                  <td>{bb.campaign_no}</td>
                  <td>{bb.customer_id}</td>
                  <td>{bb.start_date}</td>
                  <td>{bb.end_date}</td>
                  <td>{bb.text}</td>
                  <td>{bb.extra_comments}</td>
                  <td
                    onClick={() =>
                      navigate(`update_campaign/${bb.campaign_no}`)
                    }
                  >
                    <BsFillPencilFill />
                  </td>
                  <td
                    onClick={() =>
                      navigate(`delete_campaign/${bb.campaign_no}`)
                    }
                  >
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
