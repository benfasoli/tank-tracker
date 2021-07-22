import Layout from '../components/Layout';
import { useUser } from '../lib/auth';

const Index = () => {
  const { user } = useUser();
  return (
    <>
      <h1 className="font-extrabold text-3xl mb-4">Dashboard</h1>
      <p>hello {user.displayName}</p>
    </>
  );
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

export default Index;
