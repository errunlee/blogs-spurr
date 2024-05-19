import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("auth-token"),
  },
});

export default instance;
