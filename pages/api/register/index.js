import AccountServiceClient from "../../../lib/clients/AccountServiceClient";

const handler = async (request, response) => {
  const {method, body} = request;

  switch (method) {
    case "POST":
      try {
        console.log(body)
        const outcome = await AccountServiceClient.post(`v1/account`, body)
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        console.log(error)
        return response.status(error.response.status).json(error.response.data);
      }
    default:
      response.setHeader("Allow", "POST");
      return response.status(405);
  }
}

export default handler;