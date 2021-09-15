import {TokensLib} from "../../lib/tokens";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import CreatePostLayout from "../../components/layout/post/createPostLayout";
import PostCreate from "../../components/posts/postCreate";
import {useState} from "react";
import AlertSuccess from "../../components/alerts/alertSuccess";
import AlertError from "../../components/alerts/alertError";
import Head from "next/head";

const CreatePostPage = ({auth}) => {

  const [post, setPost] = useState({
    "id": uuidv4(),
    "imageUrl": "https://res.cloudinary.com/dtddfx5ww/image/upload/v1621075575/WebStore/placeholder.jpg",
    "description": "",
    "tags": "",
    "userTags": ""
  })
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handlePostFormInputChange = (name) => (event) => {
    const val = event.target.value;
    setPost({...post, [name]: val});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(post.tags)
    const tagsList = post.tags.split(",");
    const userTagsList = post.userTags.split(",");

    const postCreateBody = {...post, tags: tagsList, userTags: userTagsList}
    console.log(postCreateBody)
    try {
      await axios.post(`/api/posts/`, postCreateBody)
      setAlertSuccess(true);
    } catch (error) {
      setAlertError(true);
    }

  };

  return (
    <>
      <Head>
        <title>Create new post page</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <CreatePostLayout>
        <div className="mt-32">
          {alertSuccess && (
            <AlertSuccess
              text={"Post successfully added"}
              handleClose={() => setAlertSuccess(false)}
            />
          )}

          {alertError && (
            <AlertError
              text={"Post could not be added"}
              handleClose={() => setAlertError(false)}
            />
          )}
          <PostCreate post={post} setPost={setPost} handlePostFormInputChange={handlePostFormInputChange}
                      handleSubmit={handleSubmit}/>
        </div>

      </CreatePostLayout>
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

export default CreatePostPage;