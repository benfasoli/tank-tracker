import { atom, useRecoilState } from 'recoil';
import { createContext, useContext, useEffect, useState } from 'react';

import { TankRecord } from '../lib/types';
import { firestore } from '../lib/firebase';

export const TankContext = createContext<TankRecord[]>([]);

export const TankProvider = ({ children }) => {
  const [tanks, setTanks] = useState<TankRecord[]>([]);

  useEffect(() => {
    const query = firestore.collection('tanks');
    query.onSnapshot((snapshot) => {
      const tanks = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          ...data,
          updatedAt: data.updatedAt.toDate(),
          tankId: doc.id,
        } as TankRecord;
      });

      setTanks(tanks);
    });
  }, []);

  return <TankContext.Provider value={tanks}>{children}</TankContext.Provider>;
};

export const useTanks = () => {
  return useContext(TankContext);
};
