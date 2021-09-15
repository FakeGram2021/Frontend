import Layout from "../layout";

const RelationLayout = ({children}) => (
  <>
    <Layout>
      <div className="block justify-items-center mt-16">
        {children}
      </div>
    </Layout>
  </>
);
export default RelationLayout;
