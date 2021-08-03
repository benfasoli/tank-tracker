export type UserRole = 'pending' | 'read' | 'write' | 'admin';

export type UserPermissions = {
  isPending: boolean;
  isReader: boolean;
  isWriter: boolean;
  isAdmin: boolean;
};

// export type UserData = {
//   uid: string;
//   displayName: string;
//   email: string;
//   photoURL: string;
//   role?: UserRole;
// };

export type UserLogin = {
  id: string;
  name: string;
  email: string;
  imageURL: string;
};

export type User = UserLogin & {
  createdAt: Date;
  lastLoginAt: Date;
  role: UserRole;
};

// export type TankState = {
//   tankId: string;
//   updatedAt: Date;
//   pressure: number;
//   location: string;
//   fillId: string;
//   serial: string;
//   owner: string;
//   co2?: number;
//   ch4?: number;
//   co?: number;
//   d13c?: number;
//   d18o?: number;
// };

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
  ch4?: number;
  ch4Stdev?: number;
  ch4Sterr?: number;
  ch4N?: number;
  ch4RelativeToTanks?: string;
  ch4CalibrationFile?: string;
  co?: number;
  coStdev?: number;
  coSterr?: number;
  coN?: number;
  coRelativeToTanks?: string;
  coCalibrationFile?: string;
  d13c?: number;
  d13cStdev?: number;
  d13cSterr?: number;
  d13cN?: number;
  d13cRelativeToTanks?: string;
  d13cCalibrationFile?: string;
  d18o?: number;
  d18oStdev?: number;
  d18oSterr?: number;
  d18oN?: number;
  d18oRelativeToTanks?: string;
  d18oCalibrationFile?: string;
  comment?: string;
};
