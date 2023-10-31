// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bigcity-realestate.firebaseapp.com",
  projectId: "bigcity-realestate",
  storageBucket: "bigcity-realestate.appspot.com",
  messagingSenderId: "826201966946",
  appId: "1:826201966946:web:9ce7cb53907948064bc43b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); // export this
