import {useState} from "react";
import {useRouter} from "next/router";
import AlertError from "../components/alerts/alertError";
import RegistrationLayout from "../components/layout/registration/registrationLayout";
import axios from "axios";

function Registration() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "MALE",
    dateOfBirth: new Date(),
    biography: "",
    webUrl: ""
  });

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

  const register = async (event) => {
    event.preventDefault();
    try {
      await axios.post("api/register", user);
      await router.push("/login");
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

        <section>
          <h3 className="font-bold text-2xl">Registration</h3>
          <p className="text-gray-600 pt-2">Create a new account.</p>
        </section>

        <section className="mt-10">
          <form className="grid gap-4 grid-cols-2" method="POST" onSubmit={register}>
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
                htmlFor="password"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={user.password}
                onChange={handleUserChange("password")}
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
              Register
            </button>
          </form>
        </section>
      </main>
    </RegistrationLayout>
  );
}

export default Registration;
