import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { ReactNode } from 'react';
import UserList from '../components/UserList';

const Settings = () => {
  return (
    <>
      <PageTitle title="Settings" />
      <UserList />
    </>
  );
};

Settings.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Settings;
