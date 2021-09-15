import axios from "axios";

const AdServiceClient = axios.create({
  baseURL: `${process.env.AD_SERVICE_API}`,
});

export default AdServiceClient;
