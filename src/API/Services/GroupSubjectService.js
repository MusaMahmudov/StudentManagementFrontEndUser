import HTTPClient from "../HTTPClient";
import BaseUrl from "../BaseURLs";
class groupSubjectService extends HTTPClient {
  constructor() {
    super(BaseUrl);
  }

  async getGroupSubjectForTeacherPage(id, token) {
    return await this.getById(
      "GroupSubjects/GetGroupSubjectsForTeacherPageDTO",
      id,
      token
    );
  }
  async getGroupSubjectForSubjectsForStudentPage(studentId, token) {
    return await this.getById(
      "GroupSubjects/GetGroupSubjectsForSubjectsForStudentPage",
      studentId,
      token
    );
  }
}
export default groupSubjectService;
