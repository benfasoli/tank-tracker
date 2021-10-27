import { SessionProvider, useSession } from 'next-auth/react';

import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/dist/client/router';

type Props = {
  children: ReactNode;
  session: Session;
};

const AuthRedirect = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (!session && router.pathname !== '/login') {
    router.push('/login');
    return null;
  }

  return children;
};

const ContextProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider
      session={session}
      refetchInterval={600}
      // baseurl=""
      // basePath=""
    >
      <AuthRedirect>{children}</AuthRedirect>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'text-sm',
          style: {
            borderRadius: '999px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </SessionProvider>
  );
};

export default ContextProvider;
