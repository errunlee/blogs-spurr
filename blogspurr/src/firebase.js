

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_APIKEY),
  authDomain: "blogs-spurr.firebaseapp.com",
  projectId: "blogs-spurr",
  storageBucket: "blogs-spurr.appspot.com",
  messagingSenderId: "1073573072140",
  appId: "1:1073573072140:web:4a2e90d956b4bf4c628d29",
  measurementId: "G-FHL35EW2J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app)

// google authentication
import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();


// database

export const db = getFirestore(app);
