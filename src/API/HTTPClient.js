import axios from "axios";
import { Token } from "@mui/icons-material";
class HTTPClient {
  BaseUrl;
  constructor(BaseUrl) {
    this.BaseUrl = BaseUrl;
  }

  async getAll(endPoint, token) {
    return await axios.get(`${this.BaseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async getById(endPoint, id, token) {
    return await axios.get(`${this.BaseUrl}/${endPoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async getByIdExtra(endPoint, id, extraId, token) {
    return await axios.get(`${this.BaseUrl}/${endPoint}/${id}/${extraId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async post(endPoint, body) {
    return await axios.post(`${this.BaseUrl}/${endPoint}`, body);
  }
  async put(endPoint, id, body, token) {
    return await axios.put(`${this.BaseUrl}/${endPoint}/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async delete(endPoint, id) {
    return await axios.delete(`${this.BaseUrl}/${endPoint}/${id}`);
  }
}
export default HTTPClient;
