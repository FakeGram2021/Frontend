import Head from "next/head";
import IndexLayout from "../components/layout/index/indexLayout";
import PostOverviewCard from "../components/posts/postOverviewCard";
import PostServiceClient from "../lib/clients/PostServiceClient";
import {TokensLib} from "../lib/tokens";
import {useRouter} from "next/router";
import AdServiceClient from "../lib/clients/AdServiceClient";
import Ad from "../components/ads/ad";

const Index = ({posts, ads, error, auth}) => {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Feed page</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <IndexLayout>
        {ads && ads.map((ad) =>
          <div className={"mt-8 mb-8"}>
            <Ad
              id={ad.id}
              imageUrl={ad.imageUrl}
              adUrl={ad.adUrl}
            />
          </div>
        )}
        {posts && posts.map((post) =>
          <div className={"mt-8 mb-8"}>
            <PostOverviewCard
              id={post.id}
              imageUrl={post.imageUrl}
              description={post.description}
              posterId={post.poster.id}
              posterName={post.poster.username}
              posterAvatar={post.poster.userAvatar}
              postDate={post.postDate}
              tags={post.tags}
              userTags={post.userTags}
              likes_count={post.likes_count}
              dislikes_count={post.dislikes_count}
              favorites_count={post.favorites_count}
              comments_count={post.comments_count}
              handleClick={() => router.push(`posts/${post.id}`)}
            />
          </div>
        )}
      </IndexLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const hasCookie = cookie !== undefined && cookie !== null;
  if (!hasCookie) {
    return {
      props: {
        posts: null,
        ads: null,
        error: null,
        auth: TokensLib.getToken(context.req),
      }
    }
  }

  let posts;
  try {
    const feedResponse = await PostServiceClient.get(
      'v1/posts/feed',
      {headers: {cookie: context.req.headers.cookie}}
    );
    posts = feedResponse.data
  } catch (error) {
    posts = []
  }


  let ads;
  try {
    const adResponse = await AdServiceClient.get(
      'v1/ads',
      {headers: {cookie: context.req.headers.cookie}}
    );
    console.log(adResponse)
    ads = adResponse.data
  } catch (error) {
    ads = []
  }

  console.log(ads)

  return {
    props: {
      posts: posts,
      ads: ads,
      error: null,
      auth: TokensLib.getToken(context.req),
    }
  }
}

export default Index;
