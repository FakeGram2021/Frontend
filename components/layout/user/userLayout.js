import Layout from "../layout";

const UserLayout = ({ children }) => (
  <>
    <Layout>
      <div className="grid grid-cols-3 justify-items-center mt-16">
        {children}
      </div>
    </Layout>
  </>
);
export default UserLayout;
