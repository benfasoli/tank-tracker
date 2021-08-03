import { GithubAuthProvider, auth, firestore } from '../lib/firebase';
import { UserData, UserPermissions, UserRole } from '../lib/types';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/dist/client/router';

export const login = () => {
  auth.signInWithPopup(GithubAuthProvider).catch(console.error);
};

export const logout = () => {
  return auth.signOut().then(console.log).catch(console.error);
};

export const AuthContext = createContext({
  user: null,
  role: null,
  loading: true,
  permissions: null,
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (user) {
      const ref = firestore.collection('users').doc(user.uid);

      ref.set(
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        } as UserData,
        { merge: true }
      );

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
  } else if (role === 'write') {
    permissions.isReader = true;
    permissions.isWriter = true;
  } else if (role === 'admin') {
    permissions.isReader = true;
    permissions.isWriter = true;
    permissions.isAdmin = true;
  }

  if (loading) {
    return <></>;
  }

  if (!user && router.pathname !== '/login') {
    localStorage.setItem('loginSuccessRedirect', router.pathname);
    router.push('/login');
  }

  if (user && router.pathname === '/login') {
    const pathname = localStorage.getItem('loginSuccessRedirect') || '/';
    router.push(pathname);
  }

  // if (!role && router.pathname !== '/login') {
  //   // return <></>;
  // }

  if (permissions.isPending && router.pathname !== '/pending') {
    router.push('/pending');
  }

  if (!permissions.isPending && router.pathname === '/pending') {
    const pathname = localStorage.getItem('loginSuccessRedirect') || '/';
    router.push(pathname);
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, permissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
