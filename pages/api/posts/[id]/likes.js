import PostServiceClient from "../../../../lib/clients/PostServiceClient";

const handler = async (request, response) => {
  const {method, query} = request;
  const {id} = query;

  switch (method) {
    case "GET":
      try {
        const outcome = await PostServiceClient.get(`v1/posts/${id}/likes`, {headers: {cookie: request.headers.cookie}})
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        return response.status(error.response.status).json(error.response.data);
      }
    case "DELETE":
      try {
        const outcome = await PostServiceClient.delete(`v1/posts/${id}/likes`, {headers: {cookie: request.headers.cookie}})
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        return response.status(error.response.status).json(error.response.data);
      }
    default:
      response.setHeader("Allow", "GET,DELETE");
      return response.status(405);
  }
}

export default handler;