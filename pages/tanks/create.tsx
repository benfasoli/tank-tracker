import Layout from '../../components/Layout';
import { ReactNode } from 'react';

const CreateTank = () => {
  return <div>create a new tank page</div>;
};

CreateTank.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default CreateTank;
