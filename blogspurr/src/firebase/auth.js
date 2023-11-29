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

export class AuthService {
  async registerWithEmailPassword(auth, email, password) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  }

  async updateUserProfile(fullname) {
    try {
      const res = await updateProfile(auth.currentUser, {
        displayName: fullname,
      });
      console.log("updated name" + fullname);
      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  async loginWithGoogle() {
    const user = await signInWithPopup(auth, provider);
    return user;
  }

  async getCurrentUser() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  async logUserOut() {
    await signOut(auth);
  }

  async loginWithEmailPass(auth,email,password) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  }
}
const authService = new AuthService();

export default authService;
