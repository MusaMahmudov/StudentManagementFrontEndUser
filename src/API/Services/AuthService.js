import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class authService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async Login(body) {
    return await this.post("Authentications/Login", body);
  }
  async Logout(token) {
    return await this.post("Authentications/LogOut", token);
  }
  async changePassword(id, body, token) {
    return await this.put("Authentications/ChangePassword", id, body, token);
  }
}
