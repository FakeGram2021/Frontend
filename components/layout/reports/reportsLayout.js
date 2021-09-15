import Layout from "../layout";

const ReportsLayout = ({children}) => (
  <>
    <Layout>
      <div className="block justify-items-center mt-16">
        {children}
      </div>
    </Layout>
  </>
);
export default ReportsLayout;
