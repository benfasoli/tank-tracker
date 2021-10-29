import { TankRecord } from '../lib/tanks';
import api from '../lib/api';
import useSWR from 'swr';

export function useTanks() {
  const { data, error } = useSWR('/api/tanks', api.get);

  if (error) {
    console.error(error);
  }

  return {
    tanks: data,
    isLoading: !error && !data,
    isError: error,
  };
}

type TankHashTable = {
  [key: string]: TankRecord;
};

export function useCurrentTanks() {
  const { tanks, isLoading, isError } = useTanks();

  if (isLoading || isError) {
    return { tanks: null, isLoading, isError };
  }

  let recentTanks: TankHashTable = {};
  for (let tank of tanks) {
    const prevTank: TankRecord = recentTanks[tank.tankId];
    if (prevTank) {
      let isNewer = tank.updatedAt > prevTank.updatedAt;
      if (isNewer) {
        recentTanks[tank.tankId] = tank;
      }
    } else {
      recentTanks[tank.tankId] = tank;
    }
  }

  return { tanks: Object.values(recentTanks), isLoading, isError };
}

export function useTankHistory(tankId: string) {
  const { tanks, isLoading, isError } = useTanks();

  if (isLoading || isError) {
    return { tanks: null, isLoading, isError };
  }

  return {
    tanks: tanks
      .filter((tank) => tank.tankId === tankId)
      .sort((first, second) => {
        if (first.updatedAt > second.updatedAt) {
          return -1;
        } else if (first.updatedAt < second.updatedAt) {
          return 1;
        } else {
          return 0;
        }
      }),
    isLoading,
    isError,
  };
}
