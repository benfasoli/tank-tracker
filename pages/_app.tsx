import 'tailwindcss/tailwind.css';

import ContextProvider from '../components/ContextProvider';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/dist/client/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { user, role, loading, isPending } = useAuth();

  if (loading) {
    return <></>;
  }

  if (!user && router.pathname !== '/login') {
    localStorage.setItem('loginSuccessRedirect', router.pathname);
    router.push('/login');
    return <></>;
  }

  if (user && router.pathname === '/login') {
    const pathname = localStorage.getItem('loginSuccessRedirect') || '/';
    router.push(pathname);
    return <></>;
  }

  if (!role && router.pathname !== '/login') {
    return <></>;
  }

  if (isPending && router.pathname !== '/pending') {
    router.push('/pending');
    return <></>;
  }

  if (!isPending && router.pathname === '/pending') {
    const pathname = localStorage.getItem('loginSuccessRedirect') || '/';
    router.push(pathname);
    return <></>;
  }

  // const Layout = Component.layout || (({ children }) => <>{children}</>);
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ContextProvider>
      {getLayout(<Component {...pageProps} />)}
      <Toaster position="bottom-center" />
    </ContextProvider>
    // <AuthContext.Provider value={auth}>
    //   {getLayout(<Component {...pageProps} />)}
    //   <Toaster position="bottom-center" />
    // </AuthContext.Provider>
  );
}

export default MyApp;
