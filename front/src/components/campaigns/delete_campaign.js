import { useParams, useNavigate } from 'react-router-dom';
import {
  useDelete_campaignMutation,
  useGet_campaign_by_campaign_noQuery,
} from '../../rtk/APIS/campaign_api';
import { Divider, Badge, Group, Table, Button } from '@mantine/core';
import uuid from 'react-uuid';

export default function DeleteCampaign() {
  const { campaign_no } = useParams();
  const { data } = useGet_campaign_by_campaign_noQuery(campaign_no);
  const navigate = useNavigate();

  const [deleteCampaign] = useDelete_campaignMutation();

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color={'dark'} variant="filled">
            Delete campaign
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
                <th>campaign pk</th>
                <th>customer id</th>
                <th>start date</th>
                <th>end date</th>
                <th>text</th>
                <th>extra comments</th>
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
            deleteCampaign(campaign_no);
            navigate(`/customer_campaign/`);
          }}
        >
          Delete campaign
        </Button>
      </Group>
    </>
  );
}
