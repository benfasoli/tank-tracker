import { TankRecord, parseTankRecord } from './tanks';

import { GoogleSpreadsheet } from 'google-spreadsheet';

const getSheet = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo();
  return doc.sheetsByTitle[process.env.GOOGLE_SHEET_NAME];
};

const get = async () => {
  const sheet = await getSheet();
  const rows = await sheet.getRows();
  const tankRecords = rows.map(parseTankRecord);
  return tankRecords;
};

const add = async (tankRecord: TankRecord) => {
  const sheet = await getSheet();
  await sheet.addRow({
    ...tankRecord,
    updatedAt: tankRecord.updatedAt.toISOString(),
  });
};

export default {
  get,
  add,
};
