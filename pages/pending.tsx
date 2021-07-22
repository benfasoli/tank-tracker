import Layout from '../components/Layout';
import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

const Pending = () => {
  const { user } = useAuth();
  return (
    <p>
      Hey <b>{user.displayName}</b> - your registration is pending approval.
    </p>
  );
};

Pending.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Pending;
