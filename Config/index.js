// Import the functions you need from the SDKs you need
import app from 'firebase/compat/app'
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8u-8cbhWxBMBDmXIs3rwas9XiGSApCLk",
  authDomain: "whatsapp-694f0.firebaseapp.com",
  projectId: "whatsapp-694f0",
  storageBucket: "whatsapp-694f0.appspot.com",
  messagingSenderId: "943657767317",
  appId: "1:943657767317:web:89723eeeddd3a36953a69c",
  measurementId: "G-CGZWCBXSH8"
};

// Initialize Firebase
const firebase=app.initializeApp(firebaseConfig);
export default firebase;