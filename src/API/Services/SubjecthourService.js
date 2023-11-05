import HTTPClient from "../HTTPClient";
import BaseUrl from "../BaseURLs";
export class subjectHourService extends HTTPClient {
  constructor() {
    super(BaseUrl);
  }
  async getSubjectHoursByGroupSubject(groupSubjectIds, token) {
    return await this.getAll("SubjectHours", groupSubjectIds, token);
  }
  async getSubjectHoursForTeacherSchedule(teacherId, token) {
    return await this.getById("SubjectHours/TeacherSchedule", teacherId, token);
  }
  async getSubjectHoursForStudentSchedule(studentId, token) {
    return await this.getById("SubjectHours/StudentSchedule", studentId, token);
  }
  async getSubjectHoursForAttendanceForTeacherPage(groupSubjectId, token) {
    return await this.getById(
      "SubjectHours/TeacherPage",
      groupSubjectId,
      token
    );
  }
}
