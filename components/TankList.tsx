import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import ListBody from './ListBody';
import ListContainer from './ListContainer';
import ListData from './ListData';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import StatusDot from './StatusDot';
import StatusPill from './StatusPill';
import TextIcon from './TextIcon';
import { formatDate } from '../lib/date';
import { useTanks } from '../hooks/useTanks';

type Props = {
  searchQuery?: string;
};

const TankList = ({ searchQuery }: Props) => {
  const tanks = useTanks();
  const [pageIndex, setPageIndex] = useState(0);

  const searchQueryLower = searchQuery.toLowerCase();
  useEffect(() => {
    setPageIndex(0);
  }, [searchQuery]);

  const rows = useMemo(
    () =>
      tanks.map((tank) => {
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
    [tanks]
  );

  if (tanks.length == 0) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
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
        <span className="col-span-7 sm:col-span-4">Tank ID</span>
        <span className="col-span-5 sm:col-span-2">Last seen</span>
        <span className="col-span-2 hidden md:block">Pressure</span>
        <span className="col-span-4 hidden sm:block">Contains</span>
      </ListHeader>

      <ListBody className="divide-y divide-gray-100 whitespace-nowrap text-xs">
        {rowsOnPage.map((row) => {
          return (
            <ListItem key={row.tankId}>
              <Link href={'/tanks/' + row.tankId}>
                <a className="px-4 py-3 block hover:bg-gray-50 border border-transparent box-border rounded-lg">
                  <div className="grid grid-cols-12 gap-4">
                    <ListData className="flex col-span-7 sm:col-span-4">
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

                        <p className="text-gray-400 mt-1 font-mono">
                          <TextIcon muted className="mr-1">
                            #
                          </TextIcon>
                          {row.serial.toUpperCase().replace(/\s/g, '')}
                        </p>

                        <p className="text-gray-400 mt-1 truncate">
                          <TextIcon muted className="mr-1">
                            $
                          </TextIcon>
                          <span className="tracking-tight">
                            {row.owner || <TextIcon>-</TextIcon>}
                          </span>
                        </p>
                      </div>
                    </ListData>

                    <ListData className="col-span-5 sm:col-span-2">
                      <p className="text-gray-600 font-medium">
                        {row.location || <TextIcon>-</TextIcon>}
                      </p>

                      <p className="text-xs text-primary-400">
                        {row.updatedAt}
                      </p>

                      <StatusPill
                        color={row.pressureStatusColor}
                        className="block md:hidden mt-2 font-light text-xs">
                        {row.pressure} psi
                      </StatusPill>
                    </ListData>

                    <ListData className="hidden md:block col-span-2">
                      <StatusPill
                        color={row.pressureStatusColor}
                        className="font-light text-xs">
                        {row.pressure} psi
                      </StatusPill>
                    </ListData>

                    <ListData className="ml-8 sm:ml-0 pl-2 sm:pl-0 col-span-12 sm:col-span-3 border-l sm:border-l-0 border-gray-200">
                      <div>
                        <TextIcon className="inline-block w-8">
                          CO<sub>2</sub>
                        </TextIcon>
                        {row.co2 ? (
                          <span className="text-gray-600 font-medium">
                            {(Math.round(row.co2 * 100) / 100).toFixed(2)}{' '}
                            <span className="text-gray-400 text-xs font-light">
                              ppm
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-200">-</span>
                        )}
                      </div>

                      <div>
                        <TextIcon className="inline-block w-8">
                          CH<sub>4</sub>
                        </TextIcon>
                        {row.ch4 ? (
                          <span className="text-gray-600 font-medium">
                            {(Math.round(row.ch4 * 100) / 100).toFixed(2)}{' '}
                            <span className="text-gray-400 text-xs font-light">
                              ppb
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-200">-</span>
                        )}
                      </div>

                      <div>
                        <TextIcon className="inline-block w-8">CO</TextIcon>
                        {row.co ? (
                          <span className="text-gray-600 font-medium">
                            {(Math.round(row.co * 100) / 100).toFixed(2)}{' '}
                            <span className="text-gray-400 text-xs font-light">
                              ppb
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-200">-</span>
                        )}
                      </div>

                      <div>
                        <TextIcon className="inline-block w-8">
                          δ<sup>13</sup>C
                        </TextIcon>
                        {row.d13c ? (
                          <span className="text-gray-600 font-medium">
                            {(Math.round(row.d13c * 100) / 100).toFixed(2)}{' '}
                            <span className="text-gray-400 text-xs font-light">
                              ‰
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-200">-</span>
                        )}
                      </div>

                      <div>
                        <TextIcon className="inline-block w-8">
                          δ<sup>18</sup>O
                        </TextIcon>
                        {row.d18o ? (
                          <span className="text-gray-600 font-medium">
                            {(Math.round(row.d18o * 100) / 100).toFixed(2)}{' '}
                            <span className="text-gray-400 text-xs font-light">
                              ‰
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-200">-</span>
                        )}
                      </div>
                    </ListData>
                  </div>
                </a>
              </Link>
            </ListItem>
          );
        })}
      </ListBody>

      <div className="pt-4 border-t flex items-center space-x-4 justify-between p-4">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{rowIndexStart + 1}</span> to{' '}
          <span className="font-medium">{rowIndexEnd}</span> of{' '}
          <span className="font-medium">{rowCount}</span> results
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
