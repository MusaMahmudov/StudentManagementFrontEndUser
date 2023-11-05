import HTTPClient from "../HTTPClient";
import BaseUrl from "../BaseURLs";
class examService extends HTTPClient {
  constructor() {
    super(BaseUrl);
  }

  async getExamForExamsforTeacherPageAsign(examId, token) {
    return await this.getById(
      "Exams/GetExamForExamsForTeacherPageAssign",
      examId,
      token
    );
  }
  async getExamForSubjectsforStudentPage(groupSubjectId, token) {
    return await this.getById(
      "Exams/GetExamForSubjectsForStudentPage",
      groupSubjectId,
      token
    );
  }
}
export default examService;
