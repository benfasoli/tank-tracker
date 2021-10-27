import { TankRecord, parseTankRecord } from './tanks';

type FetchParams = Parameters<typeof fetch>;

const fetchJson = <T>(...params: FetchParams): Promise<T> => {
  return fetch(...params).then((response) => response.json() as Promise<T>);
};

const get = async () => {
  const body = await fetchJson<TankRecord[]>('/api/tanks');
  return body.map(parseTankRecord);
};

const post = async (tankRecord: TankRecord) => {
  await fetch('/api/tanks', {
    method: 'POST',
    body: JSON.stringify(tankRecord),
  });
};

export default {
  get,
  post,
};
