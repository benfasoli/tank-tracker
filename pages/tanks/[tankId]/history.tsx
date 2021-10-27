import Layout from '../../../components/Layout';
import ListBody from '../../../components/ListBody';
import ListContainer from '../../../components/ListContainer';
import ListHeader from '../../../components/ListHeader';
import Loader from '../../../components/Loader';
import { ReactNode } from 'react';
import TankPageNav from '../../../components/TankPageNav';
import TankTable from '../../../components/TankTable';
import toast from 'react-hot-toast';
import { useRouter } from 'next/dist/client/router';
import { useTankHistory } from '../../../hooks/tanks';

const TankHistoryPage = () => {
  const router = useRouter();
  const { tankId } = router.query;
  const { tanks } = useTankHistory(String(tankId));

  if (!tanks) {
    return <Loader />;
  }

  if (tanks.length == 0) {
    toast(`${tankId} not found.`, {
      icon: '🤯',
    });
    router.push('/');
  }

  return <TankTable tankRecords={tanks} />;
};

TankHistoryPage.getLayout = (page: ReactNode) => (
  <Layout>
    <TankPageNav />
    {page}
  </Layout>
);

export default TankHistoryPage;
