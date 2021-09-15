import AdminServiceClient from "../../../lib/clients/AdminServiceClient";

const handler = async (request, response) => {
  const {method, body} = request;

  switch (method) {
    case "POST":
      try {
        const outcome = await AdminServiceClient.post(`v1/report/`, body, {headers: {"Authorization": `Bearer ${request.headers.cookie.split("=")[1]}`}})
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