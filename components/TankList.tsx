import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import ListBody from './ListBody';
import ListContainer from './ListContainer';
import ListData from './ListData';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import Loader from './Loader';
import StatusDot from './StatusDot';
import StatusPill from './StatusPill';
import TextIcon from './TextIcon';
import { formatDate } from '../lib/date';
import { useCurrentTanks } from '../hooks/tanks';

type Props = {
  searchQuery?: string;
  sortBy: string;
  sortAscending: boolean;
};

const observations = [
  {
    key: 'co2',
    name: (
      <>
        CO<sub>2</sub>
      </>
    ),
    unit: 'ppm',
  },
  {
    key: 'ch4',
    name: (
      <>
        CH<sub>4</sub>
      </>
    ),
    unit: 'ppb',
  },
  {
    key: 'co',
    name: <>CO</>,
    unit: 'ppb',
  },
  {
    key: 'd13c',
    name: (
      <>
        δ<sup>13</sup>C
      </>
    ),
    unit: '‰',
  },
  {
    key: 'd18o',
    name: (
      <>
        δ<sup>18</sup>O
      </>
    ),
    unit: '‰',
  },
];

const TankList = ({ searchQuery, sortBy, sortAscending }: Props) => {
  const { tanks } = useCurrentTanks();
  const [pageIndex, setPageIndex] = useState(0);

  const searchQueryLower = searchQuery.toLowerCase();

  useEffect(() => {
    setPageIndex(0);
  }, [searchQuery]);

  const rows = useMemo(
    () =>
      tanks &&
      tanks
        .sort((first, second) => {
          if (first[sortBy] > second[sortBy]) {
            return sortAscending ? 1 : -1;
          } else if (first[sortBy] < second[sortBy]) {
            return sortAscending ? -1 : 1;
          } else if (second[sortBy]) {
            return 0;
          } else {
            return -1;
          }
        })
        .map((tank) => {
          const updatedAt = formatDate(tank.updatedAt);
          const isEmpty = tank.pressure < 500;
          const isFull = tank.pressure > 1800;

          if (isFull) {
            var pressureStatusColor = 'green';
          } else if (isEmpty) {
            var pressureStatusColor = 'red';
          } else {
            var pressureStatusColor = 'orange';
          }

          const statusColor = tank.location ? pressureStatusColor : 'red';

          return {
            ...tank,
            updatedAt,
            isEmpty,
            isFull,
            statusColor,
            pressureStatusColor,
          };
        }),
    [sortBy, sortAscending, tanks]
  );

  if (!tanks) {
    return <Loader />;
  }

  const rowsMatchingSearchQuery = rows.filter((tank) =>
    Object.keys(tank).some((key) => {
      const value = tank[key];
      return value && typeof value === 'string'
        ? value.toLowerCase().includes(searchQueryLower)
        : false;
    })
  );

  const rowCount = rowsMatchingSearchQuery.length;
  const pageSize = 20;
  const pageCount = Math.ceil(rowCount / pageSize);
  const rowIndexStart = Math.min(pageIndex * pageSize, rowCount);
  const rowIndexEnd = Math.min(rowIndexStart + pageSize, rowCount);

  const rowsOnPage = rowsMatchingSearchQuery.slice(rowIndexStart, rowIndexEnd);

  return (
    <ListContainer>
      <ListHeader className="grid grid-cols-12 gap-4">
        <span className="col-span-4">Tank ID</span>
        <span className="col-span-4 sm:col-span-4">Last seen</span>
        <span className="col-span-4 hidden sm:block">Contains</span>
      </ListHeader>

      <ListBody className="divide-y divide-gray-100 whitespace-nowrap text-xs">
        {rowsOnPage.map((row) => {
          return (
            <ListItem key={row.tankId}>
              <Link href={'/tanks/' + row.tankId}>
                <a className="px-4 py-3 block hover:bg-gray-50 border border-transparent box-border rounded-lg">
                  <div className="grid grid-cols-12 gap-4">
                    <ListData className="flex col-span-4">
                      <div className="mt-1.5 mr-4">
                        <StatusDot color={row.statusColor} />
                      </div>

                      <div className="overflow-hidden">
                        <div className="font-extrabold text-base tracking-wide">
                          {row.tankId.toUpperCase()}
                        </div>

                        <p className="text-gray-400 mt-1 font-mono">
                          <TextIcon muted className="mr-1">
                            @
                          </TextIcon>
                          {row.fillId
                            ? row.fillId.toUpperCase().replace(/\s/g, '')
                            : ''}
                        </p>

                        <p className="text-gray-400 mt-1 truncate">
                          <TextIcon muted className="mr-1">
                            $
                          </TextIcon>
                          <span className="tracking-tight">
                            {row.owner || <TextIcon muted>-</TextIcon>}
                          </span>
                        </p>
                      </div>
                    </ListData>

                    <ListData className="col-span-4 sm:col-span-4">
                      <p className="text-gray-600 font-medium">
                        {row.location || <TextIcon>-</TextIcon>}
                      </p>

                      <p className="text-xs text-primary-400">
                        {row.updatedAt}
                      </p>

                      <StatusPill
                        color={row.pressureStatusColor}
                        className="mt-2 font-light text-xs">
                        {row.pressure} psi
                      </StatusPill>
                    </ListData>

                    <ListData className="ml-8 sm:ml-0 pl-4 col-span-12 sm:col-span-4 border-l">
                      {observations.map((obs) => (
                        <div key={obs.key}>
                          <TextIcon className="inline-block w-8">
                            {obs.name}
                          </TextIcon>

                          {row[obs.key] ? (
                            <span className="text-gray-600 font-medium">
                              {(Math.round(row[obs.key] * 100) / 100).toFixed(
                                2
                              )}{' '}
                              <span className="text-gray-400 text-xs font-light">
                                {obs.unit}
                              </span>
                            </span>
                          ) : (
                            <span className="text-gray-200">-</span>
                          )}
                        </div>
                      ))}
                    </ListData>
                  </div>
                </a>
              </Link>
            </ListItem>
          );
        })}
      </ListBody>

      <div className="pt-4 border-t flex items-center space-x-4 justify-between p-4">
        <p className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-medium text-gray-600">{rowIndexStart + 1}</span>{' '}
          to <span className="font-medium text-gray-600">{rowIndexEnd}</span> of{' '}
          <span className="font-medium text-gray-600">{rowCount}</span> results
        </p>
        <nav className="z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <button
            className="inline-flex items-center px-2 py-2 rounded-l-md border border-gray-200 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50"
            onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}>
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-200 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50"
            onClick={() =>
              setPageIndex(Math.min(pageIndex + 1, pageCount - 1))
            }>
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </ListContainer>
  );
};

export default TankList;
