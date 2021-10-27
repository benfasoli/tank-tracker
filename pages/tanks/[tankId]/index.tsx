import { ReactNode, useEffect, useState } from 'react';

import EditForm from '../../../components/EditForm';
import Layout from '../../../components/Layout';
import Loader from '../../../components/Loader';
import TankPageNav from '../../../components/TankPageNav';
import { TankRecord } from '../../../lib/tanks';
import toast from 'react-hot-toast';
import { useRouter } from 'next/dist/client/router';
import { useTankHistory } from '../../../hooks/tanks';

const EditTankPage = () => {
  const router = useRouter();
  const { tankId } = router.query;
  const { tanks } = useTankHistory(String(tankId));
  const [tank, setTank] = useState<TankRecord | undefined>();

  useEffect(() => {
    tanks && tanks.length && setTank(tanks[0]);
  }, [tanks]);

  if (tanks && tanks.length == 0) {
    toast(`${tankId} not found.`, {
      icon: '🤯',
    });
    router.push('/');
  }

  if (!tank) {
    return <Loader />;
  }

  return <EditForm defaultTank={tank} />;
};

EditTankPage.getLayout = (page: ReactNode) => (
  <Layout>
    <TankPageNav />
    {page}
  </Layout>
);

export default EditTankPage;
