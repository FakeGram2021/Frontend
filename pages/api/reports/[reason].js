import AdminServiceClient from "../../../lib/clients/AdminServiceClient";

const handler = async (request, response) => {
  const {method, query} = request;
  const {reason} = query;

  switch (method) {
    case "GET":
      try {
        console.log(reason)
        const outcome = await AdminServiceClient.get(`v1/report/${reason}`, {headers: {cookie: request.headers.cookie}})
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        return response.status(error.response.status).json(error.response.data);
      }
    default:
      response.setHeader("Allow", "GET");
      return response.status(405);
  }
}

export default handler;