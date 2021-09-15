import Image from "next/image";
import {Widget, WidgetLoader} from "react-cloudinary-upload-widget";

const AdCreate = ({
                    ad,
                    setAd,
                    handleSubmit,
                    handleAdFormInputChange,
                    handleAdFormMultipleSelectInputChange,
                  }) => (
  <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow">
    <div className=" flex flex-wrap justify-center md:w-1/3 relative items-center content-center">
      <Image
        src={ad.imageUrl}
        alt={`Ad image`}
        width={320}
        height={320}
        className="rounded-lg inset-0 w-full h-full object-cover self-center"
      />
      <div
        className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-xl text-white font-semibold">
        <WidgetLoader/>
        <Widget
          sources={["local", "url"]}
          resourceType={"image"}
          cloudName={"dtddfx5ww"}
          uploadPreset={"ca9vmkkj"}
          buttonText={"Change picture"}
          className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold"
          folder={"WebStore"}
          style={{
            fontWeight: "bold",
            color: "white",
            border: "none",
            width: "768px",
            fontSize: "32px",
            backgroundColor: "#7C3AED",
            borderRadius: "10px",
            height: "512px",
          }}
          cropping={false}
          onSuccess={(result) => {
            setAd({
              ...ad,
              imageUrl: result.info.secure_url,
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

    <form className="flex-auto p-6" onSubmit={handleSubmit}>
      <div className="bg-white">
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">Ad url:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                required
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Ad url"
                value={ad.adUrl}
                onChange={handleAdFormInputChange("adUrl")}
              />
            </div>
          </div>
        </div>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">From:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                required
                type='date'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                value={ad.from}
                onChange={handleAdFormInputChange("from")}
              />
            </div>
          </div>
        </div>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">To:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                required
                type='date'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                value={ad.to}
                onChange={handleAdFormInputChange("to")}
              />
            </div>
          </div>
        </div>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">Daily limit:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                required
                type="number"
                min="0"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="10"
                value={ad.dailyLimit}
                onChange={handleAdFormInputChange("dailyLimit")}
              />
            </div>
          </div>
        </div>
        <hr/>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">Sexes to match:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <select
                multiple
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="gender"
                value={ad.sexesToMatch}
                onChange={handleAdFormMultipleSelectInputChange}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
        </div>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">Age to match, lower limit:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                type="number"
                min="0"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="0"
                value={ad.ageToMatchFrom}
                onChange={handleAdFormInputChange("ageToMatchFrom")}
              />
            </div>
          </div>
        </div>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">Age to match, upper limit:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                type="number"
                min="0"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="100"
                value={ad.ageToMatchTo}
                onChange={handleAdFormInputChange("ageToMatchTo")}
              />
            </div>
          </div>
        </div>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">Tags to match:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Comma separated tags to match"
                value={ad.tagsToMatch}
                onChange={handleAdFormInputChange("tagsToMatch")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 pb-4 ml-auto text-gray-500 ">
        <button
          type="submit"
          className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Save
        </button>
      </div>
    </form>
  </div>
);

export default AdCreate;
