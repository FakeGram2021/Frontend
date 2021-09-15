import PostServiceClient from "../../../../lib/clients/PostServiceClient";

const handler = async (request, response) => {
  const {method, body, query} = request;
  const {id} = query;

  switch (method) {
    case "POST":
      try {
        const outcome = await PostServiceClient.post(`v1/posts/${id}/comment`, body, {headers: {cookie: request.headers.cookie}})
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        return response.status(error.response.status).json(error.response.data);
      }
    default:
      response.setHeader("Allow", "POST");
      return response.status(405);
  }
}

export default handler;