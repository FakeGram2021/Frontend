import Header from "../header/header";

const Layout = ({ children }) => (
  <>
    <main className="dark:bg-gray-800 bg-white relative h-screen">
      <Header />
      <div className="container mx-auto">{children}</div>
    </main>
  </>
);
export default Layout;
