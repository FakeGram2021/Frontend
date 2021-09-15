import AccountServiceClient from "../../../lib/clients/AccountServiceClient";

const handler = async (request, response) => {
  const {method, body} = request;

  switch (method) {
    case "PUT":
      try {
        const outcome = await AccountServiceClient.put(`v1/account`, body, {headers: {"Authorization": `Bearer ${request.headers.cookie.split("=")[1]}`}})
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        return response.status(error.response.status).json(error.response.data);
      }
    default:
      response.setHeader("Allow", "PUT");
      return response.status(405);
  }
}

export default handler;