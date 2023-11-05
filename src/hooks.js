import attendanceService from "./API/Services/AttendanceService";
import { examResultService } from "./API/Services/ExamResultService";
import examService from "./API/Services/ExamService";
import groupSubjectService from "./API/Services/GroupSubjectService";
import studentService from "./API/Services/StudentService";
import { subjectHourService } from "./API/Services/SubjecthourService";
import { userService } from "./API/Services/UserService";

export const useService = () => {
  const studentServices = new studentService();
  const userServices = new userService();
  const subjectHourServices = new subjectHourService();
  const groupSubjectServices = new groupSubjectService();
  const attendanceServices = new attendanceService();
  const examResultServices = new examResultService();
  const examServices = new examService();
  return {
    examServices,
    examResultServices,
    attendanceServices,
    studentServices,
    userServices,
    subjectHourServices,
    groupSubjectServices,
  };
};
