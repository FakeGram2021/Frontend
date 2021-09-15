import axios from "axios";

const PostServiceClient = axios.create({
  baseURL: `${process.env.POST_SERVICE_API}`,
});

export default PostServiceClient;
