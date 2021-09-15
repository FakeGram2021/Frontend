import Head from "next/head";

import SearchLayout from "../../components/layout/search/searchLayout";
import PostOverviewCard from "../../components/posts/postOverviewCard";
import PostServiceClient from "../../lib/clients/PostServiceClient";
import {TokensLib} from "../../lib/tokens";
import {useState} from "react";
import {useRouter} from "next/router";
import SearchInput from "../../components/search/searchInput";
import Pagination from "../../components/pagination";

const SearchPage = ({data, query, error}) => {

  const [search, setSearch] = useState(query)
  const router = useRouter();

  const handleSearchChange = (event) => {
    const val = event.target.value;
    setSearch(val);
  };

  const getSearchQueryString = () => {
    const tagsToSearch = search.split(",");
    const queryString = "?tags=" + tagsToSearch.map(tag => encodeURIComponent(tag)).join(",");
    return queryString;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await router.push(`/search${getSearchQueryString()}`)
  };

  return (
    <>
      <Head>
        <title>Search page</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <SearchLayout>
        <SearchInput placeHolder={"Search by tags"} value={search} onChange={handleSearchChange}
                     onSubmit={handleSubmit}/>
        {data && data.content && data.content.map((post) => (
          <div className={"mt-8 mb-8"}>
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
              handleClick={(id) => router.push(`/posts/${post.id}`)}
            />
          </div>
        ))}
        {data && data.content && data.content.length > 0 && <Pagination
          pageNumber={data.number}
          first={data.number === 0}
          last={data.number === data.totalPages - 1}
          handlePreviousPageChange={{
            path: `/search`,
            query: {
              tags: search.split(" "),
              page: data.number - 1
            }
          }}
          handleNextPageChange={{
            path: `/search`,
            query: {
              tags: search.split(" "),
              page: data.number + 1
            }
          }}
        />}
      </SearchLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookie = context.req.headers.cookie;
    const hasCookie = cookie !== undefined && cookie !== null;
    const tags = context.query.tags
    console.log(tags)

    let response;
    if (context.query.tags) {
      if (hasCookie) {
        response = context.query.page
          ? await PostServiceClient.get(
            `v1/posts/tags?tags=${context.query.tags}&size=5&page=${context.query.page}`, {headers: {cookie: cookie}}
          )
          : await PostServiceClient.get(
            `v1/posts/tags?tags=${context.query.tags}&size=5&page=0`, {headers: {cookie: cookie}})
      } else {
        response = context.query.page
          ? await PostServiceClient.get(
            `v1/posts/tags?tags=${context.query.tags}&size=5&page=${context.query.page}`
          )
          : await PostServiceClient.get(
            `v1/posts/tags?tags=${context.query.tags}&size=5&page=0`)
      }
      console.log(response.data.content)
      return {
        props: {
          data: response.data,
          query: context.query.tags,
          error: null,
          auth: TokensLib.getToken(context.req),
        },
      }
    }
    return {
      props: {
        data: null,
        query: null,
        error: null,
        auth: TokensLib.getToken(context.req),
      }
    };
  } catch
    (error) {
    return {
      props: {
        data: null,
        query: null,
        error: error.message,
        auth: TokensLib.getToken(context.req),
      },
    };
  }
}

export default SearchPage;
