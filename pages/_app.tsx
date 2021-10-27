import 'tailwindcss/tailwind.css';

import ContextProvider from '../components/ContextProvider';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ContextProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </ContextProvider>
  );
};

export default App;
