import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  // getUser
} from "firebase/auth";

import { auth, provider } from "../firebase";
import axios from "axios";

export class AuthService {
  async registerWithEmailPassword(name, email, password) {
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const resData = await response.json();
    localStorage.setItem("auth-token", resData.authtoken);
    // console.log(resData.authtoken);
    return response;
  }

  async logUserOut() {
    localStorage.removeItem("auth-token");
  }

  async loginWithEmailPass(email, password) {
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const resData = await response.json();
    localStorage.setItem("auth-token", resData.authtoken);
    return response;
  }

  async getUser() {
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    return await response.json();
  }
}
const authService = new AuthService();

export default authService;
