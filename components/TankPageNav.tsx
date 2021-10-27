import Link from 'next/link';
import TankPageNavItem from './TankPageNavItem';
import { useRouter } from 'next/dist/client/router';

const TankPageNav = () => {
  const router = useRouter();
  const { tankId } = router.query;

  return (
    <nav className="flex justify-between align-center mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <div>
            <Link href="/">
              <a>
                <TankPageNavItem>/</TankPageNavItem>
              </a>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <Link href={router.asPath}>
              <a
                href="#"
                className="ml-4 text-sm font-bold text-primary-500 hover:text-primary-700"
                aria-current="page">
                <TankPageNavItem $active>{tankId}</TankPageNavItem>
              </a>
            </Link>
          </div>
        </li>
      </ol>

      <ul className="flex space-x-4">
        <li>
          <Link href={`/tanks/${tankId}`}>
            <a>
              <TankPageNavItem $active={!router.route.endsWith('history')}>
                Edit
              </TankPageNavItem>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/tanks/${tankId}/history`}>
            <a>
              <TankPageNavItem $active={router.route.endsWith('history')}>
                History
              </TankPageNavItem>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TankPageNav;
