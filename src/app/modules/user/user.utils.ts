import { UserModel } from './user.model';

//student id =  year+code+4 digit number

import { AcademicSemester } from '../academicSemester/academicSemester.interface';

//find last student
const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1, //field filtering
      _id: 0, //default ta lagbena tai 0 kore dechi
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};
// generated id
export const generateStudentId = async (payload: AcademicSemester) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};