// Validation schema for UserName
import Joi from 'joi';
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/),
});

// Validation schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNo: Joi.string().trim().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContactNo: Joi.string().trim().required(),
});

// Validation schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

// Validation schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  avatar: Joi.string(),
  contactNo: Joi.string().trim().required(),
  emergencyContactNo: Joi.string().trim().required(),
  dateOfBirth: Joi.string(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'Ab-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
