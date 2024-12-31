import { useNavigate } from 'react-router-dom';
import { Button, Group, Badge, Divider, Table } from '@mantine/core';
import { useState } from 'react';
import uuid from 'react-uuid';
import { ExcelRenderer } from 'react-excel-renderer';
import { useAdd_campaign_by_upload_fileMutation } from '../../rtk/APIS/campaign_api';
import { useSelector } from 'react-redux';

export default function CreateCampaignByUploadFile() {
  const navigate = useNavigate();
  const [excelRaws, setExcelRaws] = useState([]);
  const employee_username = useSelector(
    (state) => state.authentication.username,
  );

  const [addCampaign] = useAdd_campaign_by_upload_fileMutation();
  const data_to_server = [];

  const uploadFile = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        alert('error on uploading excel file.');
        console.log(err);
      } else {
        const { rows } = resp;
        setExcelRaws(rows && rows.slice(1, rows.length));
      }
    });
  };
  const add = async () => {
    for (let i = 0; i < excelRaws.length; i++) {
      let customer_id = excelRaws[i][0] && excelRaws[i][0];
      let trimmed_start_date = excelRaws[i][1] && excelRaws[i][1].trim();
      let trimmed_end_date = excelRaws[i][2] && excelRaws[i][2].trim();
      let text = excelRaws[i][3] && excelRaws[i][3];
      let extra_comments = excelRaws[i][4] && excelRaws[i][4];

      const task = {
        customer_id: customer_id,
        start_date: trimmed_start_date,
        end_date: trimmed_end_date,
        text: text,
        extra_comments: extra_comments,
        employee_username: employee_username,
      };
      data_to_server.push(task);
    }
    for (let i = 0; i < data_to_server.length; i++) {
      const task = { ...data_to_server[i] };
      await addCampaign(task);
    }
  };

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Create campaign by upload excel file
          </Badge>
        }
        labelPosition="center"
      />
      <div>
        <input type="file" onChange={(event) => uploadFile(event)} />
      </div>
      <Table verticalSpacing="md" striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>customer id</th>
            <th>start date</th>
            <th>end date</th>
            <th>description</th>
            <th>extra details</th>
          </tr>
        </thead>
        <tbody>
          {excelRaws &&
            excelRaws.map((arr) => (
              <tr key={uuid()}>
                {arr && arr.map((item) => <td key={uuid()}>{item}</td>)}
              </tr>
            ))}
        </tbody>
      </Table>
      <Group justify="flex-end" mt="md">
        <Button
          variant="filled"
          color="teal"
          type="submit"
          onClick={() => {
            add();
            navigate(`/customer_campaign/`);
          }}
        >
          Submit campaign
        </Button>
      </Group>
    </>
  );
}
