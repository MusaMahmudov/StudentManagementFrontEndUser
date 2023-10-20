import { studentService } from "./API/Services/StudentService";

const useService = () => {
  const studentServices = new studentService();

  return { studentServices };
};
