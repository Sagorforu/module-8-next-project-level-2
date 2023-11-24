import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';
// import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxLength: [20, 'Password can not be more than 20 character'],
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.virtual('fullName').get(function () {
  return (
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  );
});

// Document middleware
// Pre save middleware / hook
studentSchema.pre('save', async function (next) {
  // console.log(this, 'Pre hook : we will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
