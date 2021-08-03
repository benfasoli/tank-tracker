import { useEffect, useState } from 'react';

import { TankRecord } from '../lib/types';
import { firestore } from '../lib/firebase';

export const useTankHistory = (tankId: string) => {
  const [tankHistory, setTankHistory] = useState<TankRecord[]>([]);

  useEffect(() => {
    const query = firestore
      .collection('tanks')
      .doc(tankId)
      .collection('history');

    query.get().then((snapshot) => {
      const tankRecords = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          ...data,
          updatedAt: data.updatedAt.toDate(),
          tankId: doc.id,
        } as TankRecord;
      });

      setTankHistory(tankRecords);
    });
  }, []);

  return tankHistory;
};
