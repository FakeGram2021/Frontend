import UserLayout from "../../components/layout/user/userLayout";
import Head from "next/head";
import {useRouter} from "next/router";
import PrivateUserHeader from "../../components/users/PrivateUserHeader";
import {TokensLib} from "../../lib/tokens";
import AccountServiceClient from "../../lib/clients/AccountServiceClient";
import UserHeader from "../../components/users/UserHeader";
import axios from "axios";
import PostServiceClient from "../../lib/clients/PostServiceClient";
import PostOverviewCard from "../../components/posts/postOverviewCard";
import {useState} from "react";

const UserPage = ({posts, account, relation, error, auth}) => {

  const [relations, setRelations] = useState(relation)

  const router = useRouter();

  const onFollow = async (userId) => {
    try {
      await axios.post(`/api/relation/follow/${userId}`, null);
      setRelations({...relation, isFollow: true});
    } catch (error) {
      console.error(error)
    }
  }

  const onUnfollow = async (userId) => {
    try {
      await axios.put(`/api/relation/follow/${userId}`, null);
      setRelations({...relation, isFollow: false});
    } catch (error) {
      console.error(error)
    }
  }

  const onMute = async (userId) => {
    try {
      await axios.post(`/api/relation/mute/${userId}`, null);
      setRelations({...relation, isMute: true});
    } catch (error) {
      console.error(error)
    }
  }

  const onUnmute = async (userId) => {
    try {
      await axios.delete(`/api/relation/mute/${userId}`, null);
      setRelations({...relation, isMute: false});
    } catch (error) {
      console.error(error)
    }
  }

  const onBlock = async (userId) => {
    try {
      await axios.post(`/api/relation/block/${userId}`, null);
      setRelations({...relation, isBlock: true});
    } catch (error) {
      console.error(error)
    }
  }

  const onUnblock = async (userId) => {
    try {
      await axios.delete(`/api/relation/block/${userId}`, null);
      setRelations({...relation, isBlock: false});
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Search page</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <UserLayout>

        {error && <>
          <div className={"col-span-3"}>
            {account && <PrivateUserHeader
              userId={account.id}
              userName={account.username}
              userAvatar={account.avatar}
              webUrl={account.webUrl}
              biography={account.biography}
            />
            }
          </div>
          <h1
            className="text-9xl col-span-3 text-gray-700 font-light antialiased italic block leading-tight items-center place-self-center content-center justify-items-center justify-center">
            {JSON.stringify(error)} Private profile
          </h1>
        </>
        }
        {!error && <>
          <div className={"col-span-3"}>
            {account && <UserHeader userName={account.username}
                                    userAvatar={account.avatar}
                                    webUrl={account.webUrl}
                                    biography={account.biography}
                                    isFollow={relations.isFollow}
                                    onFollow={() => onFollow(account.accountId)}
                                    onUnfollow={() => onUnfollow(account.accountId)}
                                    isMute={relations.isMute}
                                    onMute={() => onMute(account.accountId)}
                                    onUnmute={() => onUnmute(account.accountId)}
                                    isBlock={relations.isBlock}
                                    onBlock={() => onBlock(account.accountId)}
                                    onUnblock={() => onUnblock(account.accountId)}
            />}
          </div>
          {posts && posts.content && posts.content.map((post) =>
            <div className={"m-8"}>
              <PostOverviewCard
                id={post.content.id}
                imageUrl={post.content.imageUrl}
                description={post.content.description}
                posterId={post.content.poster.id}
                posterName={post.content.poster.username}
                posterAvatar={post.content.poster.userAvatar}
                postDate={post.content.postDate}
                tags={post.content.tags}
                userTags={post.content.userTags}
                likes_count={post.content.likes_count}
                dislikes_count={post.content.dislikes_count}
                favorites_count={post.content.favorites_count}
                comments_count={post.content.comments_count}
                handleClick={() => router.push(`/posts/${post.id}`)}
              />
            </div>
          )}
        </>
        }
      </UserLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const hasCookie = cookie !== undefined && cookie !== null;

  let relationResponse = {
    isFollow: null,
    isBlock: null,
    isMute: null
  };


  try {
    let response;
    let accountResponse;
    if (hasCookie) {
      response = await PostServiceClient.get(
        `v1/posts/poster/${encodeURIComponent(context.params.id)}`, {headers: {cookie: context.req.headers.cookie}});
      accountResponse = await AccountServiceClient.get(
        `v1/account/${encodeURIComponent(context.params.id)}`, {headers: {"Authorization": `Bearer ${cookie.split("=")[1]}`}});
      const followResponse = await AccountServiceClient.get(
        `v1/check-status/follow/${encodeURIComponent(context.params.id)}`, {headers: {"Authorization": `Bearer ${cookie.split("=")[1]}`}}
      );
      const blockResponse = await AccountServiceClient.get(
        `v1/check-status/block/${encodeURIComponent(context.params.id)}`, {headers: {"Authorization": `Bearer ${cookie.split("=")[1]}`}}
      );
      const muteResponse = await AccountServiceClient.get(
        `v1/check-status/mute/${encodeURIComponent(context.params.id)}`, {headers: {"Authorization": `Bearer ${cookie.split("=")[1]}`}}
      );
      relationResponse = {
        isFollow: followResponse.data.relation,
        isBlock: blockResponse.data.relation,
        isMute: muteResponse.data.relation
      }
    } else {
      response = await PostServiceClient.get(
        `v1/posts/poster/${encodeURIComponent(context.params.id)}`);
      accountResponse = await AccountServiceClient.get(
        `v1/account/${encodeURIComponent(context.params.id)}`);
    }
    return {
      props: {
        posts: response.data,
        account: accountResponse.data,
        relation: relationResponse,
        error: null,
        auth: hasCookie ? TokensLib.getToken(context.req) : null,
      },
    };
  } catch (error) {
    return {
      props: {
        posts: null,
        account: null,
        relation: relationResponse,
        error: error.message,
        auth: hasCookie ? TokensLib.getToken(context.req) : null,
      },
    };
  }
}

export default UserPage;