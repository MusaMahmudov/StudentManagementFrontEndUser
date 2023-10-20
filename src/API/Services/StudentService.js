import HTTPClient from "../HTTPClient";
import BaseUrlForAll from "../BaseURLs";
export class studentService extends HTTPClient {
  constructor() {
    super(BaseUrlForAll);
  }
  async getAllStudents() {
    return await this.getAll("Students");
  }
  async getStudentById(id) {
    return await this.getById("Students", id);
  }
  async getStudentByIdForUpdate(id) {
    return await this.getById("Students/update", id);
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
