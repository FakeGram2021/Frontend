import Layout from "../layout";

const CreateAdLayout = ({children}) => (
  <>
    <Layout>
      <div className="flex items-center justify-center mt-16 h-5/6">
        <div className="container mx-auto">{children}</div>
      </div>
    </Layout>
  </>
);
export default CreateAdLayout;
