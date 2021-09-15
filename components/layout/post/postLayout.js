import Layout from "../layout";

const PostLayout = ({children}) => (
  <>
    <Layout>
      <div className="grid grid-cols-1 justify-items-center mt-16">
        {children}
      </div>
    </Layout>
  </>
);
export default PostLayout;
