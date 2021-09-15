import Header from "../../header/header";

const RegistrationLayout = ({ children }) => (
  <>
    <main className="dark:bg-gray-800 bg-white relative h-screen">
      <Header />
      <div className="flex items-center justify-center mt-16">
        <div className="container mx-auto">{children}</div>
      </div>
    </main>
  </>
);
export default RegistrationLayout;
