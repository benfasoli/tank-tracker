import 'tailwindcss/tailwind.css';

import ContextProvider from '../components/ContextProvider';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ContextProvider>{getLayout(<Component {...pageProps} />)}</ContextProvider>
  );
}

export default MyApp;
