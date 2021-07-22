import { UserData, UserRole } from '../lib/types';
import { deleteUser, setUserRole } from '../lib/db';

import UserAvatar from './UserAvatar';
import { firestore } from '../lib/firebase';
import toast from 'react-hot-toast';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useUser } from '../lib/auth';

const UserList = () => {
  const { user: currentUser, isAdmin } = useUser();

  const query = firestore.collection('users').orderBy('displayName');
  const [users] = useCollectionData<UserData>(query);

  return (
    <ul className="divide-y">
      {users &&
        users.map((user) => (
          <li
            key={user.uid}
            className="grid sm:grid-cols-2 sm:space-x-4 py-4 items-center">
            <div className="flex items-center">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <UserAvatar user={user} />
              </div>
              <div className="ml-5">
                <p className="font-bold">{user.displayName}</p>
                <p className="text-xs text-gray-300 w-36 sm:w-full truncate">
                  {user.uid}
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 mx-auto sm:mx-0">
              {isAdmin && user.uid !== currentUser.uid ? (
                <div className="flex text-gray-600 items-center">
                  <select
                    className="uppercase text-xs w-48 border-none focus:ring-transparent px-4 py-2 bg-gray-100 rounded-full"
                    value={user.role}
                    onChange={(event) => {
                      const role = event.target.value as UserRole;
                      toast.promise(setUserRole(user.uid, role), {
                        loading: `Setting ${user.displayName} role to ${role}.`,
                        success: `${user.displayName} now has role ${role}.`,
                        error: 'Could not update role.',
                      });
                    }}>
                    <option>pending</option>
                    <option>read</option>
                    <option>read+write</option>
                    <option>read+write+admin</option>
                  </select>
                  <button
                    className="hidden sm:block first-letter:transition text-gray-400 hover:text-red-400 ml-4"
                    onClick={() =>
                      toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 1000)),
                        // deleteUser(user.uid),
                        {
                          loading: 'Deleting user...',
                          success: 'User deleted.',
                          error: 'Could not delete user.',
                        }
                      )
                    }>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <span className="uppercase text-xs px-4 py-2 bg-gray-900 text-gray-100 rounded-full w-48">
                  {user.role.split('+').reverse()[0]}
                </span>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default UserList;
