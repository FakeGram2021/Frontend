import AccountServiceClient from "../../../../lib/clients/AccountServiceClient";

const handler = async (request, response) => {
  const {method, query} = request;
  const {id} = query;

  switch (method) {
    case "POST":
      try {
        const outcome = await AccountServiceClient.post(`v1/mute/${id}`, {},{headers: {"Authorization": `Bearer ${request.headers.cookie.split("=")[1]}` }})
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        return response.status(error.response.status).json(error.response.data);
      }
    case "DELETE":
      try {
        const outcome = await AccountServiceClient.delete(`v1/mute/${id}`, {headers: {"Authorization": `Bearer ${request.headers.cookie.split("=")[1]}` }})
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        return response.status(error.response.status).json(error.response.data);
      }
    default:
      response.setHeader("Allow", "POST,DELETE");
      return response.status(405);
  }
}

export default handler;