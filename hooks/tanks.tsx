import { createContext, useContext, useEffect, useState } from 'react';

import { TankState } from '../lib/types';
import { firestore } from '../lib/firebase';

export const TankContext = createContext<TankState[]>([]);

export const TankProvider = ({ children }) => {
  const [tanks, setTanks] = useState<TankState[]>([]);

  useEffect(() => {
    const query = firestore.collection('tanks').limit(30);
    query.onSnapshot((snapshot) => {
      console.log({ snapshot, changes: snapshot.docChanges() });

      const tanks = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          ...data,
          updatedAt: data.updatedAt.toDate(),
          tankId: doc.id,
        } as TankState;
      });

      setTanks(tanks);
    });
  }, []);

  return <TankContext.Provider value={tanks}>{children}</TankContext.Provider>;
};

export const useTanks = () => {
  return useContext(TankContext);
};
