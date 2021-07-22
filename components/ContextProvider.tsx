import { AuthProvider } from '../hooks/useAuth';
import { ReactNode } from 'react';
import { TankProvider } from '../hooks/useTanks';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  return (
    <AuthProvider>
      <TankProvider>{children}</TankProvider>
      <Toaster position="bottom-center" />
    </AuthProvider>
  );
};

export default ContextProvider;
