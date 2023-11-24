import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  avatar?: string | undefined;
  gender: 'male' | 'female' | 'other';
  contactNo: string;
  emergencyContactNo: string;
  dateOfBirth?: string | undefined;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'Ab-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string | undefined;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

// -----------> For creating static method <-----------
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// -----------> For creating instance method <-----------

// export type studentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   studentMethods
// >;
