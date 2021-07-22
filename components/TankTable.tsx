// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
// import { useEffect, useMemo, useState } from 'react';

// import StatusDot from './StatusDot';
// import StatusPill from './StatusPill';
// import Table from './Table';
// import TableBody from './TableBody';
// import TableData from './TableData';
// import TableHead from './TableHead';
// import TableHeadData from './TableHeadData';
// import TableRow from './TableRow';
// import { formatDate } from '../lib/date';
// import { useTanks } from '../hooks/useTanks';

// type Props = {
//   searchQuery?: string;
// };

// const TankTable = ({ searchQuery }: Props) => {
//   const tanks = useTanks();
//   const [pageIndex, setPageIndex] = useState(0);

//   const searchQueryLower = searchQuery.toLowerCase();
//   useEffect(() => {
//     setPageIndex(0);
//   }, [searchQuery]);

//   const rows = useMemo(
//     () =>
//       tanks.map((tank) => {
//         const updatedAt = formatDate(tank.updatedAt);
//         const isEmpty = tank.pressure < 500;
//         const isFull = tank.pressure > 1800;

//         if (isFull) {
//           var pressureStatusColor = 'green';
//         } else if (isEmpty) {
//           var pressureStatusColor = 'red';
//         } else {
//           var pressureStatusColor = 'orange';
//         }

//         const statusColor = tank.location ? pressureStatusColor : 'red';

//         return {
//           ...tank,
//           updatedAt,
//           isEmpty,
//           isFull,
//           statusColor,
//           pressureStatusColor,
//         };
//       }),
//     [tanks]
//   );

//   if (tanks.length == 0) {
//     return (
//       <div className="">
//         <div className=""></div>
//       </div>
//     );
//   }

//   const rowsMatchingSearchQuery = rows.filter((tank) =>
//     Object.keys(tank).some((key) => {
//       const value = tank[key];
//       return value && typeof value === 'string'
//         ? value.toLowerCase().includes(searchQueryLower)
//         : false;
//     })
//   );

//   const pageSize = 10;
//   const rowCount = rowsMatchingSearchQuery.length;
//   const pageCount = Math.ceil(rowCount / pageSize);
//   const rowIndexStart = Math.min(pageIndex * pageSize, rowCount);
//   const rowIndexEnd = Math.min(rowIndexStart + pageSize, rowCount);

//   const rowsOnPage = rowsMatchingSearchQuery.slice(rowIndexStart, rowIndexEnd);

//   return (
//     <div className="rounded-lg shadow-sm overflow-scroll border">
//       <Table className="table-fixed">
//         <TableHead>
//           <TableRow>
//             <TableHeadData className="w-2/12" scope="col">
//               Tank ID
//             </TableHeadData>
//             <TableHeadData className="w-2/12" scope="col">
//               Last seen
//             </TableHeadData>
//             <TableHeadData className="w-1/12" scope="col">
//               Pressure
//             </TableHeadData>
//             <TableHeadData className="w-7/12" scope="col">
//               Content
//             </TableHeadData>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rowsOnPage.map((row) => (
//             <TableRow className="my-2 hover:bg-gray-50 rounded-full">
//               <TableData>
//                 <div className="flex">
//                   <div className="mt-1.5 mr-2">
//                     <StatusDot color={row.statusColor} />
//                   </div>
//                   <div>
//                     <p className="flex items-center">
//                       <span className="font-extrabold text-center text-base tracking-wide">
//                         {row.tankId.toUpperCase()}
//                       </span>
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1 font-mono">
//                       <span className="select-none text-gray-300 font-extralight mr-1">
//                         @
//                       </span>
//                       {row.fillId
//                         ? row.fillId.toUpperCase().replace(/\s/g, '')
//                         : ''}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1 font-mono">
//                       <span className="select-none text-gray-300 font-extralight mr-1">
//                         #
//                       </span>
//                       {row.serial.toUpperCase().replace(/\s/g, '')}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1 truncate overflow-hidden">
//                       <span className="select-none text-gray-300 font-extralight mr-1 font-mono">
//                         $
//                       </span>
//                       <span className="tracking-tight">
//                         {row.owner || (
//                           <span className="text-gray-300"> - </span>
//                         )}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </TableData>

//               <TableData>
//                 <p className="flex items-center mr-2">
//                   {row.location ? (
//                     <span className="text-gray-600 font-medium">
//                       {row.location}
//                     </span>
//                   ) : (
//                     <span className="text-gray-300"> - </span>
//                   )}
//                 </p>

//                 <p className="text-xs text-primary-400">{row.updatedAt}</p>
//                 {/* <p className="text-xs text-gray-400 truncate overflow-hidden">
//                   {row.owner}
//                 </p> */}
//               </TableData>

//               <TableData>
//                 <StatusPill
//                   color={row.pressureStatusColor}
//                   className="mt-1 font-light text-xs">
//                   {row.pressure} psi
//                 </StatusPill>
//               </TableData>

//               <TableData className="grid md:grid-cols-2">
//                 <div>
//                   <span className="select-none text-gray-400 font-extralight text-xs inline-block w-10">
//                     CO<sub>2</sub>
//                   </span>
//                   {row.co2 ? (
//                     <span className="text-gray-600 font-medium">
//                       {(Math.round(row.co2 * 100) / 100).toFixed(2)}{' '}
//                       <span className="text-gray-400 text-xs font-light">
//                         ppm
//                       </span>
//                     </span>
//                   ) : (
//                     <span className="text-gray-200">-</span>
//                   )}
//                 </div>

//                 <div>
//                   <span className="select-none text-gray-400 font-extralight text-xs inline-block w-10">
//                     CH<sub>4</sub>
//                   </span>
//                   {row.ch4 ? (
//                     <span className="text-gray-600 font-medium">
//                       {(Math.round(row.ch4 * 100) / 100).toFixed(2)}{' '}
//                       <span className="text-gray-400 text-xs font-light">
//                         ppb
//                       </span>
//                     </span>
//                   ) : (
//                     <span className="text-gray-200">-</span>
//                   )}
//                 </div>

//                 <div>
//                   <span className="select-none text-gray-400 font-extralight text-xs inline-block w-10">
//                     CO
//                   </span>
//                   {row.co ? (
//                     <span className="text-gray-600 font-medium">
//                       {(Math.round(row.co * 100) / 100).toFixed(2)}{' '}
//                       <span className="text-gray-400 text-xs font-light">
//                         ppb
//                       </span>
//                     </span>
//                   ) : (
//                     <span className="text-gray-200">-</span>
//                   )}
//                 </div>

//                 <div>
//                   <span className="select-none text-gray-400 font-extralight text-xs inline-block w-10">
//                     δ<sup>13</sup>C
//                   </span>
//                   {row.d13c ? (
//                     <span className="text-gray-600 font-medium">
//                       {(Math.round(row.d13c * 100) / 100).toFixed(2)}{' '}
//                       <span className="text-gray-400 text-xs font-light">
//                         ‰
//                       </span>
//                     </span>
//                   ) : (
//                     <span className="text-gray-200">-</span>
//                   )}
//                 </div>

//                 <div>
//                   <span className="select-none text-gray-400 font-extralight text-xs inline-block w-10">
//                     δ<sup>18</sup>O
//                   </span>
//                   {row.d18o ? (
//                     <span className="text-gray-600 font-medium">
//                       {(Math.round(row.d18o * 100) / 100).toFixed(2)}{' '}
//                       <span className="text-gray-400 text-xs font-light">
//                         ‰
//                       </span>
//                     </span>
//                   ) : (
//                     <span className="text-gray-200">-</span>
//                   )}
//                 </div>
//               </TableData>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <div className="pt-4 border-t flex items-center space-x-4 justify-between p-4">
//         <p className="text-sm text-gray-700">
//           Showing <span className="font-medium">{rowIndexStart + 1}</span> to{' '}
//           <span className="font-medium">{rowIndexEnd}</span> of{' '}
//           <span className="font-medium">{rowCount}</span> results
//         </p>
//         <nav className="z-0 inline-flex rounded-md shadow-sm -space-x-px">
//           <button
//             className="inline-flex items-center px-2 py-2 rounded-l-md border border-gray-200 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50"
//             onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}>
//             <span className="sr-only">Previous</span>
//             <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//           </button>
//           <button
//             className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-200 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50"
//             onClick={() =>
//               setPageIndex(Math.min(pageIndex + 1, pageCount - 1))
//             }>
//             <span className="sr-only">Next</span>
//             <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//           </button>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default TankTable;
