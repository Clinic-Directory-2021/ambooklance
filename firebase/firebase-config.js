// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS1WiExRvebwJBBDgHu-07IfMjg5zABn4",
  authDomain: "ambooklance.firebaseapp.com",
  projectId: "ambooklance",
  storageBucket: "ambooklance.appspot.com",
  messagingSenderId: "778040736194",
  appId: "1:778040736194:web:f1ae7bd4a792d64202be5b",
  measurementId: "G-29MNB74SLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebase = getFirestore(app);
export const storage = getStorage(app);