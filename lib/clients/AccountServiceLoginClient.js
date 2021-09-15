import axios from "axios";

const AccountServiceLoginClient = axios.create({
  baseURL: `${process.env.ACCOUNT_SERVICE_LOGIN_API}`,
});

export default AccountServiceLoginClient;
