import Container from './Container';
import Head from 'next/head';
import Navbar from './Navbar';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title?: string;
};

const Footer = () => (
  <footer>
    <Container>
      <div className="my-6 text-gray-400 text-xs text-center font-light space-y-2 sm:flex justify-between">
        <div>
          Problem? Reach out to{' '}
          <a
            href="https://benfasoli.com"
            className="text-primary-400 font-bold"
            target="_blank">
            Ben Fasoli 👋
          </a>
        </div>
        <div>© {new Date().getFullYear()} All rights reserved</div>
      </div>
    </Container>
  </footer>
);

const Layout = ({ children, title }: Props) => (
  <>
    <Head>
      <title>{title || 'Tank Tracker'}</title>
      <meta
        name="description"
        content="Tank asset database for UATAQ lab operations."
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
    </Head>
    <div className="min-h-screen w-full subpixel-antialiased">
      <header>
        <Navbar />
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  </>
);

export default Layout;
