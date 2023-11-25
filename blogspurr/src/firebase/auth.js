import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  // getUser
} from "firebase/auth";
import { auth, provider } from "../firebase";

export class AuthService {
  async registerWithEmailPassword(auth, email, password) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
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
}
const authService = new AuthService();

export default authService;
