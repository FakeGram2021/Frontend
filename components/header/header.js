import Link from "next/link";
import HeaderItem from "./headerItem";
import {TokensLib} from "../../lib/tokens";

const Header = () => {

  const token = TokensLib.getToken();

  const isUser = token ? TokensLib.decodeToken(token).roles.includes("ROLE_USER") : false;
  const isAgent = token ? TokensLib.decodeToken(token).roles.includes("ROLE_AGENT") : false;
  const isAdmin = token ? TokensLib.decodeToken(token).roles.includes("ROLE_ADMIN") : false;

  return (
    <nav className="bg-white shadow-lg">
      <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
        <div className="text-2xl font-bold text-gray-800 md:text-3xl">
          <Link href="/">
            <a>FakeGram</a>
          </Link>
        </div>
        {token && isAdmin && (
          <div>
            <HeaderItem link={"/reports"} text={"Reports"} />
            <HeaderItem link={"/agent/registration"} text={"Agent registration"} />
            <span onClick={() => TokensLib.removeToken()}>
              <HeaderItem link={"/"} text={"Logout"} />
            </span>
          </div>
        )}
        {token && isAgent && (
          <div>
            <HeaderItem link={"/"} text={"Front page"} />
            <HeaderItem link={"/search"} text={"Search posts"} />
            <HeaderItem link={"/search/users"} text={"Search users"} />
            <HeaderItem link={"/ads/create"} text={"Create a new ad"} />
            <span onClick={() => TokensLib.removeToken()}>
              <HeaderItem link={"/"} text={"Logout"} />
            </span>
          </div>
        )}
        {token && isUser && (
          <div>
            <HeaderItem link={"/"} text={"Front page"} />
            <HeaderItem link={"/search"} text={"Search posts"} />
            <HeaderItem link={"/search/users"} text={"Search users"} />
            <HeaderItem link={"/posts/create"} text={"Create a new post"} />
            <HeaderItem link={"/users/followed"} text={"Followed users"} />
            <HeaderItem link={"/users/blocked"} text={"Blocked users"} />
            <HeaderItem link={"/users/muted"} text={"Muted users"} />
            <HeaderItem link={"/profile"} text={"Profile"} />
            <span onClick={() => TokensLib.removeToken()}>
              <HeaderItem link={"/"} text={"Logout"} />
            </span>
          </div>
        )}
        {!token && (
          <div className="md:flex">
            <HeaderItem link={"/search"} text={"Search posts"} />
            <HeaderItem link={"/registration"} text={"Registration"} />
            <HeaderItem link={"/login"} text={"Login"} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
