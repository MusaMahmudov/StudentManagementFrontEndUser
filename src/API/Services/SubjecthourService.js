import HTTPClient from "../HTTPClient";
import BaseUrl from "../BaseURLs";
export class subjectHourService extends HTTPClient {
  constructor() {
    super(BaseUrl);
  }
  async getSubjectHoursByGroupSubject(groupSubjectIds, token) {
    return await this.getAll("SubjectHours", groupSubjectIds, token);
  }
}
