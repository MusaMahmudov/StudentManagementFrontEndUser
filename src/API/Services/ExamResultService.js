import HTTPClient from "../HTTPClient";
import BaseUrl from "../BaseURLs";
export class examResultService extends HTTPClient {
  constructor() {
    super(BaseUrl);
  }
  async getExamResultForExamForStudentPage(examId, studentId, token) {
    return await this.getByIdExtra("ExamResults", examId, studentId, token);
  }
  async getExamResultsForFinalExamForStudentPage(
    groupSubjectId,
    studentId,
    token
  ) {
    return await this.getByIdExtra(
      "ExamResults/GetExamResultsForFinalExamForStudentPage",
      groupSubjectId,
      studentId,
      token
    );
  }

  async createExamResult(body, token) {
    return await this.post("ExamResults", body, token);
  }
  async updateExamResult(id, body, token) {
    return await this.put("ExamResults", id, body, token);
  }
}
