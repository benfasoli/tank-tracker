import Button from './Button';
import Link from 'next/link';
import { MenuIcon } from '@heroicons/react/solid';
import NavLink from './NavLink';
import { logout } from '../hooks/useAuth';
import { useState } from 'react';

const navLinkData = [
  { title: 'Tanks', href: '/' },
  { title: 'Settings', href: '/settings' },
];

const NavLinks = () => (
  <ul>
    {navLinkData.map((link) => (
      <li key={link.title}>
        <NavLink href={link.href}>{link.title}</NavLink>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className="max-w-6xl mx-auto p-4 sm:px-6">
      <div className="flex align-center justify-between items-center">
        <Link href="/">
          <a>
            <div className="font-bold text-lg font-extrabold">
              <span className="text-primary-600 font-black">Tank</span> Tracker
            </div>
          </a>
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="">
            <MenuIcon className="h-5 w-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 border top-5 mt-2 rounded-xl bg-white text-black p-4 z-10 shadow-lg">
              <div
                className="py-2 border-b"
                onClick={() => setIsDropdownOpen(false)}>
                <NavLinks />
              </div>
              <div className="pt-3">
                <Button $primary onClick={logout}>
                  Log out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
