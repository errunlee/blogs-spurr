import axios from "axios";
import instance from "../api/instance";
export class AdminService {
  async getAllUsers() {
    const res = await instance.get(
      "http://localhost:5000/api/users/getAllUsers"
    );
    return res?.data;
  }

  async reportBlog(id, payload) {
    const res = await instance.post(
      `http://localhost:5000/api/users/report/${id}`,
      payload
    );
    return res?.data;
  }

  async getAllReport() {
    const res = await instance.get(
      "http://localhost:5000/api/users/getreports"
    );
    return res?.data;
  }
}

const adminService = new AdminService();
export default adminService;
