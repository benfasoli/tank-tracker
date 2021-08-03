import { ReactNode, useState } from 'react';

import Layout from '../../../components/Layout';
import Link from 'next/link';
import TankPageNav from '../../../components/TankPageNav';
import { useRouter } from 'next/dist/client/router';
import { useTankHistory } from '../../../hooks/useTankHistory';

const TankHistory = () => {
  const router = useRouter();
  const { tankId } = router.query;

  const [showHistory, setShowHistory] = useState(false);

  // const tankHistory = useTankHistory(tankId as string);
  // console.log({ tankHistory });

  return 'the history of the tank';
};

TankHistory.getLayout = (page: ReactNode) => (
  <Layout>
    <TankPageNav />
    {page}
  </Layout>
);

export default TankHistory;

// <nav className="flex" aria-label="Breadcrumb">
// <ol className="flex items-center space-x-4">
//   <li>
//     <div>
//       <a href="#" className="text-gray-400 hover:text-gray-500">
//         <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
//         <span className="sr-only">Home</span>
//       </a>
//     </div>
//   </li>
//   {pages.map((page) => (
//     <li key={page.name}>
//       <div className="flex items-center">
//         <svg
//           className="flex-shrink-0 h-5 w-5 text-gray-300"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           aria-hidden="true"
//         >
//           <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
//         </svg>
//         <a
//           href={page.href}
//           className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
//           aria-current={page.current ? 'page' : undefined}
//         >
//           {page.name}
//         </a>
//       </div>
//     </li>
//   ))}
// </ol>
// </nav>
