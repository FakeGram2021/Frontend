import Image from "next/image";
import {Widget, WidgetLoader} from "react-cloudinary-upload-widget";

const PostCreate = ({
                      post,
                      setPost,
                      handleSubmit,
                      handlePostFormInputChange,
                    }) => (
  <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow">
    <div className=" flex flex-wrap justify-center md:w-1/3 relative items-center content-center">
      <Image
        src={post.imageUrl}
        alt={`Post image`}
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
            width: "320px",
            fontSize: "32px",
            backgroundColor: "#7C3AED",
            borderRadius: "10px",
            height: "320px",
          }}
          cropping={false}
          onSuccess={(result) => {
            setPost({
              ...post,
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
          <h2 className="max-w-sm mx-auto md:w-1/3">Post description:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Description"
                value={post.description}
                onChange={handlePostFormInputChange("description")}
              />
            </div>
          </div>
        </div>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3">Post tags:</h2>
          <div className="max-w-sm mx-auto md:w-2/3">
            <div className=" relative ">
              <input
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Tags"
                value={post.tags}
                onChange={handlePostFormInputChange("tags")}
              />
            </div>
          </div>
        </div>
        <hr/>
        <div className="bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Tag users:</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className="relative ">
                <input
                  type="text"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="User tags"
                  value={post.userTags}
                  onChange={handlePostFormInputChange("userTags")}
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
      </div>
    </form>
  </div>
);

export default PostCreate;
