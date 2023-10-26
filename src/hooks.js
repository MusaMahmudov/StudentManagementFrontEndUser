import studentService from "./API/Services/StudentService";
import { subjectHourService } from "./API/Services/SubjecthourService";
import { userService } from "./API/Services/UserService";

export const useService = () => {
  const studentServices = new studentService();
  const userServices = new userService();
  const subjectHourServices = new subjectHourService();
  return { studentServices, userServices, subjectHourServices };
};
