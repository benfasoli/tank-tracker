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
        <Container>
          <div className="my-6 text-gray-400 text-xs text-center font-light flex justify-between">
            <div>
              Problem? Contact{' '}
              <a
                href="https://benfasoli.com"
                className="text-primary-400 font-bold"
                target="_blank">
                Ben Fasoli
              </a>
            </div>
            <div>© {new Date().getFullYear()} All rights reserved</div>
          </div>
        </Container>
      </footer>
    </div>
  </>
);

export default Layout;
