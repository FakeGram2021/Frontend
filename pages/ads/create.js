import {TokensLib} from "../../lib/tokens";
import {v4 as uuidv4} from "uuid";
import CreateAdLayout from "../../components/layout/ad/createAdLayout";
import AdCreate from "../../components/ads/adCreate";
import {useState} from "react";
import AlertSuccess from "../../components/alerts/alertSuccess";
import AlertError from "../../components/alerts/alertError";
import Head from "next/head";
import dayjs from 'dayjs';
import axios from "axios";

const CreateAdPage = ({auth}) => {

  const [ad, setAd] = useState({
    id: uuidv4(),
    imageUrl: "https://res.cloudinary.com/dtddfx5ww/image/upload/v1621075575/WebStore/placeholder.jpg",
    adUrl: "",
    from: new Date(),
    to: new Date(),
    dailyLimit: null,
    sexesToMatch: [],
    ageToMatchFrom: null,
    ageToMatchTo: null,
    tagsToMatch: ""
  })
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleAdFormInputChange = (name) => (event) => {
    const val = event.target.value;
    setAd({...ad, [name]: val});
  };

  const handleAdFormMultipleSelectInputChange = (event) => {
    let value = Array.from(event.target.selectedOptions, option => option.value);
    setAd({...ad, sexesToMatch: value});
  }

  const handleAdFormInputDateChange = (name) => (event) => {
    const val = event.target.value;
    const date = dayjs(new Date(val));
    setAd({...ad, [name]: date.format('yyyy-MM-dd')});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const adToCreate = {
      ...ad,
      rom: new Date(ad.from).toUTCString(),
      to: new Date(ad.to).toUTCString(),
      ageToMatchFrom: ad.ageToMatchFrom === "" ? null : ad.ageToMatchFrom,
      ageToMatchTo: ad.ageToMatchTo === "" ? null : ad.ageToMatchTo,
      sexesToMatch: ad.sexesToMatch.length === 0 ? null : ad.sexesToMatch.map((s) => s.toUpperCase()),
      tagsToMatch: ad.tagsToMatch === "" ? null : ad.tagsToMatch.split(",")
    }

    try {
      await axios.post(`/api/ads`, adToCreate)
      setAlertSuccess(true);
    } catch (error) {
      setAlertError(true);
    }

  };

  return (
    <>
      <Head>
        <title>Create new ad page</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <CreateAdLayout>
        <div className="mt-32">
          {alertSuccess && (
            <AlertSuccess
              text={"Ad successfully added"}
              handleClose={() => setAlertSuccess(false)}
            />
          )}

          {alertError && (
            <AlertError
              text={"Ad could not be added"}
              handleClose={() => setAlertError(false)}
            />
          )}
          <AdCreate ad={ad} setAd={setAd} handleAdFormInputChange={handleAdFormInputChange}
                    handleAdFormMultipleSelectInputChange={handleAdFormMultipleSelectInputChange}
                    handleAdFormInputDateChange={handleAdFormInputDateChange}
                    handleSubmit={handleSubmit}/>
        </div>

      </CreateAdLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      auth: TokensLib.getToken(context.req),
    }
  }
}

export default CreateAdPage;