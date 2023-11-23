import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.joiValidation';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student found successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // data validation using joi
    const { error, value } = studentValidationSchema.validate(studentData);
    // console.log({ error }, { value });
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    }
    const result = await StudentServices.createStudentIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
