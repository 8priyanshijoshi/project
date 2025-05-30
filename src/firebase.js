import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9QmBMIPfQirG20WN6tJ3aPIH6tkakyvs",
  authDomain: "login-17bc0.firebaseapp.com",
  projectId: "login-17bc0",
  storageBucket: "login-17bc0.appspot.com", // Fixed storageBucket
  messagingSenderId: "10386331375",
  appId: "1:10386331375:web:3513db0b484cdfacb9ed1a",
  measurementId: "G-5KTR4Y7L0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
