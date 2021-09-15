import axios from "axios";

const AdminServiceClient = axios.create({
  baseURL: `${process.env.ADMIN_SERVICE_API}`,
});

export default AdminServiceClient;
