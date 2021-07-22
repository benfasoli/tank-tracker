import Head from 'next/head';

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return (
    <>
      <Head>
        <title>Tank Tracker {title}</title>
      </Head>
      <h1 className="font-extrabold text-3xl mb-4">{title}</h1>
    </>
  );
};

export default PageTitle;
