import Head from "next/head";

import SearchLayout from "../../components/layout/search/searchLayout";
import {useState} from "react";
import {useRouter} from "next/router";
import SearchInput from "../../components/search/searchInput";
import AccountServiceClient from "../../lib/clients/AccountServiceClient";
import PrivateUserHeader from "../../components/users/PrivateUserHeader";

const SearchUserPage = ({data, query}) => {

  const [search, setSearch] = useState(query)
  const router = useRouter();

  const handleSearchChange = (event) => {
    const val = event.target.value;
    setSearch(val);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await router.push(`/search/users?username=${encodeURIComponent(search)}`)
  };

  return (
    <>
      <Head>
        <title>Users search page</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <SearchLayout>
        <SearchInput placeHolder={"Search by users"} value={search} onChange={handleSearchChange}
                     onSubmit={handleSubmit}/>
        {data && data.map((account) => (
          <div className={"mt-8 mb-8"}>
            <PrivateUserHeader
              userId={account.userId}
              userName={account.username}
              userAvatar={account.userAvatar}
              webUrl={account.webUrl}
              biography={account.biography}
            />
          </div>
        ))}
      </SearchLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    console.log(context.query.username)
    if (context.query.username) {
      console.log("here")
      const response = await AccountServiceClient.get(
        `v1/search?username=${context.query.username}`)
      console.log(response)
      return {
        props: {
          data: response.data,
          query: context.query.username,
          error: null
        },
      }
    }
    return {
      props: {
        data: null,
        query: null,
        error: null
      }
    };
  } catch
    (error) {
    return {
      props: {
        data: null,
        query: null,
        error: error.message
      },
    };
  }
}

export default SearchUserPage;
