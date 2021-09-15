import {useState} from "react";
import {useRouter} from "next/router";
import RegistrationLayout from "../../components/layout/registration/registrationLayout";
import AlertError from "../../components/alerts/alertError";
import Image from "next/image";
import {Widget, WidgetLoader} from "react-cloudinary-upload-widget";
import {TokensLib} from "../../lib/tokens";
import AccountServiceClient from "../../lib/clients/AccountServiceClient";
import dayjs from "dayjs";
import axios from "axios";

const Profile = ({userData, error, auth}) => {
  const [user, setUser] = useState(userData);

  const [alertError, setAlertError] = useState(false);
  const router = useRouter();

  const handleUserChange = (name) => (event) => {
    const val = event.target.value;
    setUser({...user, [name]: val});
  };

  const handleUserGenderChange = (name) => (event) => {
    const val = event.target.value;
    setUser({...user, [name]: val.toUpperCase()});
  };

  const handleUserChangeDate = (name) => (event) => {
    const val = event.target.value;
    setUser({...user, [name]: new Date(val).getTime()});
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    console.log(user)
    try {
      await axios.put("/api/profile", user);
    } catch (error) {
      setAlertError(error.response.status);
    }
  };

  return (
    <RegistrationLayout>
      <main className="bg-white max-w-lg mt-16 mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        {alertError && (
          <AlertError
            text={"Registration not successful"}
            handleClose={() => setAlertError(false)}
          />
        )}

        <div className="flex flex-wrap justify-center relative items-center content-center">
          <Image
            src={user.avatar}
            alt={`User avatar`}
            width={320}
            height={320}
            className="rounded-lg inset-0 w-full h-full object-cover self-center"
          />
          <div
            className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-white font-semibold">
            <WidgetLoader/>
            <Widget
              sources={["local", "url"]}
              resourceType={"image"}
              cloudName={"dtddfx5ww"}
              uploadPreset={"ca9vmkkj"}
              buttonText={"Change picture"}
              className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-white font-semibold"
              folder={"WebStore"}
              style={{
                fontWeight: "bold",
                color: "white",
                border: "none",
                width: "320px",
                fontSize: "32px",
                backgroundColor: "#7C3AED",
                borderRadius: "10px",
                height: "320px",
              }}
              cropping={false}
              onSuccess={(result) => {
                setUser({
                  ...user,
                  avatar: result.info.secure_url,
                });
              }}
              onFailure={(error, result) =>
                console.log(`error - ${error}\nresult - ${result}`)
              }
              logging={false}
              use_filename={false}
            />
          </div>
        </div>

        <section className="mt-10">

          <form className="grid gap-4 grid-cols-2" method="POST" onSubmit={updateProfile}>
            <div className="mb-6 col-span-2 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                type="text"
                id="email"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={user.email}
                onChange={handleUserChange("email")}
              />
            </div>
            <div className="mb-6 col-span-2 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="username"
              >
                Username
              </label>
              <input
                required
                type="text"
                id="username"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={user.username}
                onChange={handleUserChange("username")}
              />
            </div>
            <div className="mb-6 col-span-2 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="webUrl"
              >
                Web url
              </label>
              <input
                required
                type="text"
                id="webUrl"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={user.webUrl}
                onChange={handleUserChange("webUrl")}
              />
            </div>
            <div className="mb-6  col-span-2 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="privacy"
              >
                Privacy
              </label>
              <div className="relative">
                <select
                  required
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  id="gender"
                  value={user.privacy}
                  onChange={handleUserGenderChange("privacy")}
                >
                  <option>Private</option>
                  <option>Public</option>
                </select>
              </div>
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="firstName"
              >
                First name
              </label>
              <input
                required
                type="text"
                id="firstName"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={user.firstName}
                onChange={handleUserChange("firstName")}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="lastName"
              >
                Last name
              </label>
              <input
                required
                type="text"
                id="lastName"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={user.lastName}
                onChange={handleUserChange("lastName")}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="phoneNumber"
              >
                Phone number
              </label>
              <input
                required
                type="text"
                id="phoneNumber"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={user.phoneNumber}
                onChange={handleUserChange("phoneNumber")}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="gender"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  required
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  id="gender"
                  value={user.gender}
                  onChange={handleUserGenderChange("gender")}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="mb-6 col-span-2 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="dateOfBirth"
              >
                Date of birth
              </label>
              <input
                required
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                label='From date'
                type='date'
                value={dayjs(user.dateOfBirth).format("YYYY-MM-DD")}
                onChange={handleUserChangeDate("dateOfBirth")}
              />
            </div>
            <div className="mb-6 col-span-2 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="biography"
              >
                Biography
              </label>
              <textarea
                type="text"
                id="biography"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={user.biography}
                onChange={handleUserChange("biography")}
              />
            </div>
            <button
              className="bg-purple-600 col-span-2 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              Update profile
            </button>
          </form>
        </section>
      </main>
    </RegistrationLayout>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const hasCookie = cookie !== undefined && cookie !== null;
  if (!hasCookie) {
    return {
      props: {
        userData: null,
        error: null,
        auth: TokensLib.getToken(context.req),
      }
    }
  }

  const authUserId = TokensLib.decodeToken(TokensLib.getToken(context.req)).sub;
  const response = await AccountServiceClient.get(
    `v1/account/${authUserId}`,
    {headers: {"Authorization": `Bearer ${authUserId}`}}
  );
  console.log(response)

  return {
    props: {
      userData: response.data,
      error: null,
      auth: TokensLib.getToken(context.req),
    }
  }
}

export default Profile;
