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
      <Toaster
        position="top-center"
        toastOptions={{ className: 'text-sm text-gray-800' }}
      />
    </AuthProvider>
  );
};

export default ContextProvider;
