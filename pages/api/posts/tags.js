// import PostServiceClient from "../../../lib/clients/PostServiceClient";
//
// const handler = async (request, response) => {
//   const { method, body, query } = request;
//   const { id } = query;
//
//   switch (method) {
//     case "GET":
//       try {
//         const outcome = await PostServiceClient.get("")
//       } catch (error) {
//
//       }
//     default:
//       response.setHeader("Allow", "GET");
//       return response.status(405);
//   }
// }
//
// export default handler;