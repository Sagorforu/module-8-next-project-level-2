import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';
// import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    // trim: true,
    // required: [true, 'First name is required'],
    // maxLength: [20, 'First Name can not be longer than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not capitalize format',
    // },
  },
  middleName: {
    type: String,
    // trim: true,
  },
  lastName: {
    type: String,
    //   trim: true,
    //   required: [true, 'Last name is required'],
    //   validate: {
    //     validator: (value: string) => validator.isAlpha(value),
    //     message: '{VALUE} is not valid',
    //   },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    // trim: true,
    // required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    // trim: true,
    // required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    // trim: true,
    // required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    // trim: true,
    // required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    // trim: true,
    // required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    // trim: true,
    // required: [true, 'Mother contact number is required'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    // trim: true,
    // required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    // trim: true,
    // required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    // trim: true,
    // required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    // trim: true,
    // required: [true, 'Local guardian address is required'],
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    // required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    // trim: true,
    // required: [true, 'Name is required'],
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    // trim: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid email',
    // },
  },
  gender: {
    type: String,
    // enum: {
    //   values: ['male', 'female', 'other'],
    //   message: '{VALUE} is not valid',
    // },
    // required: true,
  },
  avatar: { type: String },
  contactNo: {
    type: String,
    // required: true,
    // trim: true
  },
  emergencyContactNo: {
    type: String,
    // required: true,
    // trim: true
  },
  dateOfBirth: { type: String },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'Ab-'],
  },
  presentAddress: {
    type: String,
    // required: true
  },
  permanentAddress: {
    type: String,
    // required: true
  },
  guardian: {
    type: guardianSchema,
    // required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    // required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
