import axios from "axios";

const AccountServiceClient = axios.create({
  baseURL: `${process.env.ACCOUNT_SERVICE_API}`,
});

export default AccountServiceClient;
