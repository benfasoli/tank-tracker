import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../../lib/db';
import { getSession } from 'next-auth/react';
import { parseTankRecord } from '../../lib/tanks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const session = await getSession({ req });

  if (!session) {
    res.status(403).end('Not authenticated.');
    return;
  }

  if (!session.role) {
    res.status(401).end('Not authorized.');
  }

  switch (method) {
    case 'GET':
      const rows = await db.get();
      res.status(200).json(rows);
      break;
    case 'POST':
      const tankRecord = parseTankRecord(JSON.parse(body));
      await db.add(tankRecord);
      res.status(201).json(tankRecord);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} not allowed.`);
  }
};
