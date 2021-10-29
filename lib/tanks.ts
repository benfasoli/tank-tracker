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

const toStringOrEmpty = (str: any) => (str ? String(str) : null);
const toFloatOrEmpty = (str: any) => (str ? parseFloat(str) : null);
const toIntOrEmpty = (str: any) => (str ? parseInt(str) : null);

export const parseTankRecord = (row) =>
  ({
    updatedAt: new Date(row.updatedAt),
    serial: String(row.serial),
    tankId: String(row.tankId),
    fillId: toStringOrEmpty(row.fillId),
    userId: String(row.userId),
    pressure: toIntOrEmpty(row.pressure),
    location: toStringOrEmpty(row.location),
    owner: toStringOrEmpty(row.owner),
    co2: toFloatOrEmpty(row.co2),
    co2Stdev: toFloatOrEmpty(row.co2Stdev),
    co2Sterr: toFloatOrEmpty(row.co2Sterr),
    co2N: toIntOrEmpty(row.co2N),
    co2RelativeTo: toStringOrEmpty(row.co2RelativeTo),
    co2CalibrationFile: toStringOrEmpty(row.co2CalibrationFile),
    co2InstrumentId: toStringOrEmpty(row.co2InstrumentId),
    ch4: toFloatOrEmpty(row.ch4),
    ch4Stdev: toFloatOrEmpty(row.ch4Stdev),
    ch4Sterr: toFloatOrEmpty(row.ch4Sterr),
    ch4N: toIntOrEmpty(row.ch4N),
    ch4RelativeTo: toStringOrEmpty(row.ch4RelativeTo),
    ch4CalibrationFile: toStringOrEmpty(row.ch4CalibrationFile),
    ch4InstrumentId: toStringOrEmpty(row.ch4InstrumentId),
    co: toFloatOrEmpty(row.co),
    coStdev: toFloatOrEmpty(row.coStdev),
    coSterr: toFloatOrEmpty(row.coSterr),
    coN: toIntOrEmpty(row.coN),
    coRelativeTo: toStringOrEmpty(row.coRelativeTo),
    coCalibrationFile: toStringOrEmpty(row.coCalibrationFile),
    coInstrumentId: toStringOrEmpty(row.coInstrumentId),
    d13c: toFloatOrEmpty(row.d13c),
    d13cStdev: toFloatOrEmpty(row.d13cStdev),
    d13cSterr: toFloatOrEmpty(row.d13cSterr),
    d13cN: toIntOrEmpty(row.d13cN),
    d18o: toFloatOrEmpty(row.d18o),
    d18oStdev: toFloatOrEmpty(row.d18oStdev),
    d18oSterr: toFloatOrEmpty(row.d18oSterr),
    d18oN: toIntOrEmpty(row.d18oN),
    ottoCalibrationFile: toStringOrEmpty(row.ottoCalibrationFile),
    comment: toStringOrEmpty(row.comment),
  } as TankRecord);
