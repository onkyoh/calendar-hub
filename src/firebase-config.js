import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCTHL5BTzDoxO1BOM0_4Rk0Cuy75Gu2JVE",
  authDomain: "group-calendar-ba0ca.firebaseapp.com",
  projectId: "group-calendar-ba0ca",
  storageBucket: "group-calendar-ba0ca.appspot.com",
  messagingSenderId: "126689017771",
  appId: "1:126689017771:web:117677e04dc5615dbadcee",
  measurementId: "G-5T2BDW3JM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);