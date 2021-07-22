import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  return (
    <>
      <h1 className="font-extrabold text-3xl mb-4">Dashboard</h1>
      <p>hello {user.displayName}</p>
    </>
  );
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

export default Index;
