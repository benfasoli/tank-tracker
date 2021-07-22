import { UserData, UserRole } from '../lib/types';
import { deleteUser, setUserRole } from '../lib/db';

import ListBody from './ListBody';
import ListContainer from './ListContainer';
import ListData from './ListData';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
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
    <ListContainer>
      <ListHeader className="flex">
        <span className="-mx-1 sm:w-4/12">User</span>
        <span className="w-4/12 hidden sm:block">Permissions</span>
        <span className="w-1/12 hidden sm:block">Delete</span>
      </ListHeader>

      <ListBody className="divide-y divide-gray-100">
        {users &&
          users.map((user) => (
            <ListItem key={user.uid} className="flex flex-wrap items-center">
              <ListData className="flex items-center w-full sm:w-4/12 h-10">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <UserAvatar user={user} />
                </div>

                <div className="ml-4">
                  <p className="font-bold text-sm">{user.displayName}</p>
                  <p className="text-xs text-gray-300 truncate">{user.uid}</p>
                </div>
              </ListData>

              <ListData className="ml-14 mt-2 sm:w-4/12">
                {isAdmin && user.uid !== currentUser.uid ? (
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
                ) : (
                  <div className="uppercase text-xs w-48 border-none px-4 py-2 bg-gray-900 rounded-full text-gray-100">
                    {user.role.split('+').reverse()[0]}
                  </div>
                )}
              </ListData>

              <ListData className="w-1/12">
                <button
                  className="hidden sm:block first-letter:transition text-gray-400 hover:text-red-400"
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
              </ListData>
              {/* 
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
              </div> */}
            </ListItem>
          ))}
      </ListBody>
    </ListContainer>
  );
};

export default UserList;
