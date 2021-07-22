import { ReactNode, useState } from 'react';

import Button from '../components/Button';
import Layout from '../components/Layout';
import Link from 'next/link';
import TankList from '../components/TankList';
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { permissions } = useAuth();

  return (
    <>
      <div className="flex items-center justify-between space-x-4 mb-4">
        <input
          type="text"
          name="search"
          id="search"
          className="max-w-sm focus:ring-primary-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Search"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        {permissions && (
          <Link href="/tanks/create">
            <a>
              <Button $primary className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                New tank
              </Button>
            </a>
          </Link>
        )}
      </div>
      <TankList searchQuery={searchQuery} />
    </>
  );
};

Index.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Index;
