import AccountServiceLoginClient from "../../../lib/clients/AccountServiceLoginClient";
import FormData from "form-data";

const handler = async (request, response) => {
  const {method, body} = request;

  switch (method) {
    case "POST":
      try {
        const params = new URLSearchParams()
        params.append("username", body.username)
        params.append("password", body.password)

        let bodyFormData = new FormData()
        bodyFormData.append("username", body.username)
        bodyFormData.append("password", body.password)
        const outcome = await AccountServiceLoginClient.post(`login`, params, {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
        console.log(outcome);
        return response.status(outcome.status).json(outcome.data);
      } catch (error) {
        console.error("ERROR")
        console.log(error)
        return response.status(error.response.status).json(error.response.data);
      }
    default:
      response.setHeader("Allow", "POST");
      return response.status(405);
  }
}

export default handler;