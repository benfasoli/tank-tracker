import CreateForm from '../../components/CreateForm';
import Layout from '../../components/Layout';
import { ReactNode } from 'react';

const CreateTankPage = () => {
  return <CreateForm />;
};

CreateTankPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default CreateTankPage;
