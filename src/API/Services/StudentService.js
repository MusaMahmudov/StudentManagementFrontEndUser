import HTTPClient from "../HTTPClient";
import BaseUrl from "../BaseURLs";
class studentService extends HTTPClient {
  constructor() {
    super(BaseUrl);
  }
  async getAllStudents() {
    return await this.getAll("Students");
  }
  async getStudentById(id, token) {
    return await this.getById("Students", id, token);
  }
  async getStudentByIdForUpdate(id) {
    return await this.getById("Students/update", id);
  }
  async getStudentByIdForStudentPage(id, token) {
    return await this.getById("Students/GetStudentForStudentPage", id, token);
  }
  async createStudent(body) {
    return await this.post("Students", body);
  }
  async updateStudent(id, body) {
    return await this.put("Students", id, body);
  }
  async deleteStudent(id) {
    return await this.delete("Students", id);
  }
}
export default studentService;
