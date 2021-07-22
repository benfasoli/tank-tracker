import Link, { LinkProps } from 'next/link';

import { ReactNode } from 'react';
import { useRouter } from 'next/dist/client/router';

type Props = {
  href: string;
  children: ReactNode;
};

const NavLink = ({ href, children }: Props) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a className={`${isActive ? 'font-bold' : ''}`}>{children}</a>
    </Link>
  );
};

export default NavLink;
