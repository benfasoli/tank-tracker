import { GithubAuthProvider, auth, firestore } from './firebase';
import { UserData, UserPermissions, UserRole } from './types';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

export const login = () => {
  auth.signInWithPopup(GithubAuthProvider).catch(console.error);
};

export const logout = () => {
  return auth.signOut().then(console.log).catch(console.error);
};

export const useAuth = () => {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (user) {
      const ref = firestore.collection('users').doc(user.uid);

      // update saved user details
      ref.set(
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        } as UserData,
        { merge: true }
      );

      // get user details with role
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          setRole(snapshot.data()?.role);
        },
        (error) => {
          if (error.code === 'permission-denied') {
            setRole('pending');
          }
        }
      );
      return unsubscribe;
    } else {
      setRole(null);
    }
  }, [user]);

  var permissions = {
    isPending: false,
    isReader: false,
    isWriter: false,
    isAdmin: false,
  } as UserPermissions;
  if (role === 'pending') {
    permissions.isPending = true;
  } else if (role === 'read') {
    permissions.isReader = true;
  } else if (role === 'read+write') {
    permissions.isReader = true;
    permissions.isWriter = true;
  } else if (role === 'read+write+admin') {
    permissions.isReader = true;
    permissions.isWriter = true;
    permissions.isAdmin = true;
  }

  return { user, role, loading, ...permissions };
};

export const AuthContext = createContext({
  user: null,
  role: null,
  loading: true,
  isPending: null,
  isReader: null,
  isWriter: null,
  isAdmin: null,
});

export const useUser = () => {
  return useContext(AuthContext);
};
