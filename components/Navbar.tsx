import { signOut, useSession } from 'next-auth/react';

import Button from './Button';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="max-w-6xl mx-auto p-4 sm:px-6">
      <div className="flex align-center justify-between items-center">
        <Link href="/">
          <a>
            <div className="text-lg font-extrabold flex align-center space-x-2">
              <div>
                <span className="text-primary-600 font-black">Tank</span>{' '}
                Tracker
              </div>
            </div>
          </a>
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="">
            <img
              src={session.user.image}
              style={{ borderRadius: '50%', height: 35 }}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 border top-5 mt-2 rounded-xl bg-white text-black p-4 z-10 shadow-lg space-y-2">
              <div onClick={() => setIsDropdownOpen(false)}>
                <ul className="space-y-1">
                  <li>
                    <a
                      href={
                        'https://github.com/uataq/tank-tracker/settings/access'
                      }
                      target="_blank">
                      Users
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1p4LuLfq75ORQnqirGqmOHZDS0M0xodSpy1s-DfMkt04"
                      target="_blank">
                      Database
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="pt-3">
                <Button $primary onClick={() => signOut()}>
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
