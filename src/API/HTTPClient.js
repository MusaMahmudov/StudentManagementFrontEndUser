import axios from "axios";

class HTTPClient {
  constructor(BaseUrl) {
    this.BaseUrl = BaseUrl;
  }

  async GetAll(endPoint) {
    return await axios.get(`${this.BaseUrl}/${endPoint}`);
  }
  async getById(endPoint, id) {
    return await axios.get(`${this.BaseUrl}/${endPoint}/${id}`);
  }
  async post(endPoint, body) {
    return await axios.post(`${this.BaseUrl}/${endPoint}`, body);
  }
  async put(endPoint, id, body) {
    return await axios.put(`${this.BaseUrl}/${endPoint}/${id}`, body);
  }
  async delete(endPoint, id) {
    return await axios.delete(`${this.BaseUrl}/${endPoint}/${id}`);
  }
}
export default HTTPClient;
