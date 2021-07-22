import { AuthContext, useAuth } from '../lib/auth';

import { ReactNode } from 'react';
import { TankProvider } from '../hooks/tanks';

type Props = {
  children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      <TankProvider>{children}</TankProvider>
    </AuthContext.Provider>
  );
};

export default ContextProvider;
