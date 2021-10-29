import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { ReactNode, useState } from 'react';

import Button from '../components/Button';
import Layout from '../components/Layout';
import Link from 'next/link';
import TankList from '../components/TankList';

export default function IndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('tankId');
  const [sortAscending, setSortAscending] = useState(true);

  return (
    <div>
      <div className="block sm:flex md:space-x-4 items-center justify-between space-y-2 mb-2">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="search"
            id="search"
            className="sm:max-w-sm focus:ring-primary-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md"
            placeholder="Search"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 justify-end">
          <div className="flex space-x-1">
            <button
              className="block items-center px-2 py-2 rounded-md text-gray-400 hover:bg-gray-50 hover:text-primary-400"
              onClick={() => setSortAscending((prev) => !prev)}>
              {sortAscending ? (
                <>
                  <span className="sr-only">Ascending</span>
                  <ArrowSmUpIcon className="h-4 w-4 " aria-hidden="true" />
                </>
              ) : (
                <>
                  <span className="sr-only">Descending</span>
                  <ArrowSmDownIcon className="h-4 w-4 " aria-hidden="true" />
                </>
              )}
            </button>

            <select
              className="focus:ring-primary-500 focus:border-indigo-500 text-sm border-gray-300 rounded-md"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}>
              <option value="tankId">Tank ID</option>
              <option value="updatedAt">Updated at</option>
              <option value="pressure">Pressure</option>
              <option value="location">Location</option>
              <option value="co2">CO2</option>
              <option value="ch4">CH4</option>
              <option value="co">CO</option>
              <option value="d13c">d13C</option>
              <option value="d18o">d18O</option>
            </select>
          </div>

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
        </div>
      </div>

      <TankList
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortAscending={sortAscending}
      />
    </div>
  );
}

IndexPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
