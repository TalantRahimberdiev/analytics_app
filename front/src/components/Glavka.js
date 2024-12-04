import { Routes, Route } from 'react-router-dom';
import ListTariffs from './tariffs/list_of_tariffs';
import CreateBank from './banks/create_bank';
import ListBanks from './banks/list_banks';
import UpdateBank from './banks/update_bank';
import DeleteBank from './banks/delete_bank';
import CreateTariffManually from './tariffs/create_tariff_manually';
import UpdateTariff from './tariffs/update_tariff';
import DeleteTariff from './tariffs/delete_tariff';
import CreateTariffByUploadFile from './tariffs/create_tariff_by_upload_file';

import ListCustomers from './customers/list_customers';
import CreateCustomer from './customers/create_customer';
import UpdateCustomer from './customers/update_customer';
import DeleteCustomer from './customers/delete_customer';
import ListCampaigns from './campaigns/list_of_campaigns';
import UpdateCampaign from './campaigns/update_campaign';
import DeleteCampaign from './campaigns/delete_campaign';
import CreateCampaignManually from './campaigns/create_campaign_manually';
import CreateCampaignByUploadFile from './campaigns/create_campaign_by_upload_file';

export default function Glavka() {
  return (
    <Routes>
      <Route path="bank_tariff/" element={<ListBanks />} />
      <Route path="bank_tariff/:pk" element={<ListTariffs />} />
      <Route path="create_bank/" element={<CreateBank />} />
      <Route path="bank_tariff/update_bank/:pk" element={<UpdateBank />} />
      <Route path="bank_tariff/delete_bank/:pk" element={<DeleteBank />} />
      <Route
        path="create_tariff_manually/"
        element={<CreateTariffManually />}
      />
      <Route
        path="create_tariff_by_upload_file/"
        element={<CreateTariffByUploadFile />}
      />
      <Route
        path="bank_tariff/:pk/update_tariff/:entry_id"
        element={<UpdateTariff />}
      />
      <Route
        path="bank_tariff/:pk/delete_tariff/:entry_id"
        element={<DeleteTariff />}
      />

      <Route path="customer_campaign/" element={<ListCustomers />} />
      <Route path="create_customer/" element={<CreateCustomer />} />
      <Route
        path="customer_campaign/update_customer/:pk"
        element={<UpdateCustomer />}
      />
      <Route
        path="customer_campaign/delete_customer/:pk"
        element={<DeleteCustomer />}
      />
      <Route path="customer_campaign/:pk" element={<ListCampaigns />} />
      <Route
        path="create_campaign_manually/"
        element={<CreateCampaignManually />}
      />
      <Route
        path="create_campaign_by_upload_file/"
        element={<CreateCampaignByUploadFile />}
      />
      <Route
        path="customer_campaign/:pk/update_campaign/:campaign_no"
        element={<UpdateCampaign />}
      />
      <Route
        path="customer_campaign/:pk/delete_campaign/:campaign_no"
        element={<DeleteCampaign />}
      />
    </Routes>
  );
}
