import Layout from '../components/Layout';
import { ReactNode } from 'react';
import { useUser } from '../lib/auth';

const Pending = () => {
  const { user } = useUser();
  return (
    <p>
      Hey <b>{user.displayName}</b> - your registration is pending approval.
    </p>
  );
};

Pending.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Pending;
