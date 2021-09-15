import RelationLayout from "../../components/layout/user/relationLayout";
import Image from "next/image";
import {useRouter} from "next/router";
import AccountServiceClient from "../../lib/clients/AccountServiceClient";
import {TokensLib} from "../../lib/tokens";

const FollowedPage = ({ data, auth, errorStatus }) => {

  const router = useRouter();

  return (
    <RelationLayout>
      { data && data.map((user) =>
        <div className="flex items-center justify-center mt-16 w-full">
          <div className="bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
            <div className="flex justify-between p-6">
              <div className="flex items-center space-x-4" onClick={() => router.push(`/users/${user.accountId}`)}>
                <Image
                  src={user.avatar}
                  width={32}
                  height={32}
                  className="absolute rounded-lg inset-0 w-full h-full object-cover"
                />
                <h1 className="text-lg text-gray-900 font-bold">{user.username}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </RelationLayout>
  )
}

export async function getServerSideProps(context) {
  try {
    const cookie = context.req.headers.cookie;
    const hasCookie = cookie !== undefined && cookie !== null;

    const response = await AccountServiceClient.get(
        `v1/following/FOLLOW`,
        {headers: {"Authorization": `Bearer ${TokensLib.getToken(context.req)}`}});
    console.log(response)

    return {
      props: {
        data: response.data,
        auth: hasCookie ? TokensLib.getToken(context.req) : null,
        errorStatus: null
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        data: null,
        auth: TokensLib.getToken(context.req),
        errorStatus: error.response ? error.response.status : "No response"
      },
    };
  }
}

export default FollowedPage;