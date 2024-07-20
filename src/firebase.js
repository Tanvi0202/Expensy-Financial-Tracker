// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABqPc6kjeYLmouUXuvIn5QC2wlyIOzJ6s",
  authDomain: "expensy-f69fb.firebaseapp.com",
  projectId: "expensy-f69fb",
  storageBucket: "expensy-f69fb.appspot.com",
  messagingSenderId: "1016883486249",
  appId: "1:1016883486249:web:0be76f6cb74d7fe67ac638",
  measurementId: "G-ST6G4M0DDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };