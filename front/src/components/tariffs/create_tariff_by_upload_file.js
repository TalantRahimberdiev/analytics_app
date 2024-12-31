import { useNavigate } from 'react-router-dom';
import { Button, Group, Badge, Divider, Table } from '@mantine/core';
import { useState } from 'react';
import uuid from 'react-uuid';
import { ExcelRenderer } from 'react-excel-renderer';
import { useAdd_tariff_by_upload_fileMutation } from '../../rtk/APIS/tariff_api';
import { useBank_tariffQuery } from '../../rtk/APIS/bank_api';
import { useSelector } from 'react-redux';

export default function CreateTariffByUploadFile() {
  const navigate = useNavigate();
  const { data } = useBank_tariffQuery();
  const [excelRaws, setExcelRaws] = useState([]);
  const employee_username = useSelector(
    (state) => state.authentication.username,
  );

  const [addTariff] = useAdd_tariff_by_upload_fileMutation();
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
      let trimmed_bank_title = excelRaws[i][0] && excelRaws[i][0].trim();
      let trimmed_promo_campaign_name =
        excelRaws[i][2] && excelRaws[i][2].trim();
      let trimmed_url = excelRaws[i][3] && excelRaws[i][3].trim();
      let trimmed_entry_date = excelRaws[i][4] && excelRaws[i][4].trim();
      let bank_object = data.find((item) => item.title === trimmed_bank_title);

      const task = {
        bank_id: bank_object && bank_object['id'],
        interest_rate: excelRaws[i][1] && excelRaws[i][1],
        promo_campaign_name: trimmed_promo_campaign_name,
        url: trimmed_url,
        entry_date: trimmed_entry_date,
        employee_username: employee_username,
      };
      task.bank_id && data_to_server.push(task);
    }
    for (let i = 0; i < data_to_server.length; i++) {
      const task = { ...data_to_server[i] };
      await addTariff(task);
    }
  };

  return (
    <>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color="dark" variant="filled">
            Create tariff by upload excel file
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
            <th>bank title</th>
            <th>interest rate</th>
            <th>promo</th>
            <th>link</th>
            <th>entry date</th>
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
            navigate(`/bank_tariff/`);
          }}
        >
          Submit tariffs
        </Button>
      </Group>
    </>
  );
}
