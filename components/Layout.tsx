import Container from './Container';
import Head from 'next/head';
import Navbar from './Navbar';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Head>
      <title>Tank Tracker</title>
      <meta
        name="description"
        content="Tank asset database for UATAQ lab operations."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="min-h-screen w-full subpixel-antialiased">
      <header>
        <Navbar />
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <footer>
        <div className="my-6 text-gray-400 text-sm text-center">
          Problem? Contact{' '}
          <a
            href="https://benfasoli.com"
            className="text-primary-400 font-bold">
            Ben Fasoli
          </a>
        </div>
      </footer>
    </div>
  </>
);

export default Layout;
