export type TankRecord = {
  updatedAt: Date;
  serial: string;
  tankId: string;
  fillId: string;
  userId: string;
  pressure: number;
  location: string;
  owner: string;
  co2?: number;
  co2Stdev?: number;
  co2Sterr?: number;
  co2N?: number;
  co2RelativeTo?: string;
  co2CalibrationFile?: string;
  co2InstrumentId?: string;
  ch4?: number;
  ch4Stdev?: number;
  ch4Sterr?: number;
  ch4N?: number;
  ch4RelativeTo?: string;
  ch4CalibrationFile?: string;
  ch4InstrumentId?: string;
  co?: number;
  coStdev?: number;
  coSterr?: number;
  coN?: number;
  coRelativeTo?: string;
  coCalibrationFile?: string;
  coInstrumentId?: string;
  d13c?: number;
  d13cStdev?: number;
  d13cSterr?: number;
  d13cN?: number;
  d18o?: number;
  d18oStdev?: number;
  d18oSterr?: number;
  d18oN?: number;
  ottoCalibrationFile?: string;
  comment?: string;
};

const toStringOrEmpty = (str: string) => (str ? String(str) : '');

export const parseTankRecord = (row) =>
  ({
    updatedAt: new Date(row.updatedAt),
    serial: String(row.serial),
    tankId: String(row.tankId),
    fillId: toStringOrEmpty(row.fillId),
    userId: String(row.userId),
    pressure: parseInt(row.pressure),
    location: toStringOrEmpty(row.location),
    owner: toStringOrEmpty(row.owner),
    co2: parseFloat(row.co2),
    co2Stdev: parseFloat(row.co2Stdev),
    co2Sterr: parseFloat(row.co2Sterr),
    co2N: parseInt(row.co2N),
    co2RelativeTo: toStringOrEmpty(row.co2RelativeTo),
    co2CalibrationFile: toStringOrEmpty(row.co2CalibrationFile),
    co2InstrumentId: toStringOrEmpty(row.co2InstrumentId),
    ch4: parseFloat(row.ch4),
    ch4Stdev: parseFloat(row.ch4Stdev),
    ch4Sterr: parseFloat(row.ch4Sterr),
    ch4N: parseInt(row.ch4N),
    ch4RelativeTo: toStringOrEmpty(row.ch4RelativeTo),
    ch4CalibrationFile: toStringOrEmpty(row.ch4CalibrationFile),
    ch4InstrumentId: toStringOrEmpty(row.ch4InstrumentId),
    co: parseFloat(row.co),
    coStdev: parseFloat(row.coStdev),
    coSterr: parseFloat(row.coSterr),
    coN: parseInt(row.coN),
    coRelativeTo: toStringOrEmpty(row.coRelativeTo),
    coCalibrationFile: toStringOrEmpty(row.coCalibrationFile),
    coInstrumentId: toStringOrEmpty(row.coInstrumentId),
    d13c: parseFloat(row.d13c),
    d13cStdev: parseFloat(row.d13cStdev),
    d13cSterr: parseFloat(row.d13cSterr),
    d13cN: parseInt(row.d13cN),
    d18o: parseFloat(row.d18o),
    d18oStdev: parseFloat(row.d18oStdev),
    d18oSterr: parseFloat(row.d18oSterr),
    d18oN: parseInt(row.d18oN),
    ottoCalibrationFile: toStringOrEmpty(row.ottoCalibrationFile),
    comment: toStringOrEmpty(row.comment),
  } as TankRecord);
