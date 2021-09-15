import ReportsLayout from "../components/layout/reports/reportsLayout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TokensLib} from "../lib/tokens";
import {faCalendarTimes, faTimes, faUserTimes} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AdminServiceClient from "../lib/clients/AdminServiceClient";
import {useState} from "react";

const Reports = ({initialReports}) => {

  const [reports, setReports] = useState(initialReports)

  const getReportsBullying = async () => {
    try {
      const response = await axios.get(`api/reports/BULLYING`);
      setReports(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const getReportsNudity = async () => {
    try {
      const response = await axios.get(`api/reports/NUDITY`);
      setReports(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const getReportsViolence = async () => {
    try {
      const response = await axios.get(`api/reports/VIOLENCE`);
      setReports(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const getReportsHateSpeech = async () => {
    try {
      const response = await axios.get(`api/reports/HATE_SPEECH`);
      setReports(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ReportsLayout>
      <div className="col-span-4">
        <div
          className="min-w-screen min-h-screen flex items-center justify-center  font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Post location</th>
                  <th className="py-3 px-6 text-left">Reported account</th>
                  <th className="py-3 px-6 text-left">Reason</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                {reports && reports.map((report) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {report.reportedAccountId}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        {report.reportedAccountId}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        {report.reportReason}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <FontAwesomeIcon icon={faUserTimes}/>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <FontAwesomeIcon icon={faCalendarTimes}/>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <FontAwesomeIcon icon={faTimes}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="inline-flex">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                      onClick={() => getReportsBullying()}>
                Bullying
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 block"
                      onClick={() => getReportsNudity()}>
                Nudity
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 block"
                      onClick={() => getReportsHateSpeech()}>
                Hate speech
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                      onClick={() => getReportsViolence()}>
                Violence
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReportsLayout>
  )
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const hasCookie = cookie !== undefined && cookie !== null;

  try {
    const response = await AdminServiceClient.get(
      `v1/report/BULLYING`, {headers: {"Authorization": `Bearer ${cookie.split("=")[1]}`}})
    console.log(response)

    return {
      props: {
        initialReports: response.data,
        error: null,
        auth: hasCookie ? TokensLib.getToken(context.req) : null,
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        initialReports: null,
        error: error.message,
        auth: hasCookie ? TokensLib.getToken(context.req) : null,
      },
    };
  }
}

export default Reports;