import AdServiceClient from "../../../lib/clients/AdServiceClient";

const handler = async (request, response) => {
  const {method, body} = request;

  switch (method) {
    case "POST":
      try {
        const outcome = await AdServiceClient.post(`v1/ads`, body, {headers: {cookie: request.headers.cookie}})
        console.log(outcome);
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        console.error(error);
        return response.status(error.response.status).json(error.response.data);
      }
    default:
      response.setHeader("Allow", "POST");
      return response.status(405);
  }
}

export default handler;