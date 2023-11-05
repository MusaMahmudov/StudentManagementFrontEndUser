import HTTPClient from "../HTTPClient";
import BaseUrl from "../BaseURLs";
class attendanceService extends HTTPClient {
  constructor() {
    super(BaseUrl);
  }

  async getAttendanceForTeacherPage(groupSubjectId, token) {
    return await this.getById("Attendances/TeacherPage", groupSubjectId, token);
  }
  async getAttendanceForStudentAttendacePage(studentId, groupSubjectId, token) {
    return await this.getByIdExtra(
      "Attendances",
      studentId,
      groupSubjectId,
      token
    );
  }
  async updateAttendanceForTeacherPage(id, body, token) {
    return await this.put("Attendances", id, body, token);
  }
}
export default attendanceService;
