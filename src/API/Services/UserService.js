import HTTPClient from "../HTTPClient";
import BaseUrl from "../BaseURLs";
export class userService extends HTTPClient {
  constructor() {
    super(BaseUrl);
  }
  async getAllUsers(token) {
    return await this.getAll("Accounts", token);
  }
  async getUserById(id, token) {
    return await this.getById("Accounts", id, token);
  }
}
