// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH8OPYZmzMwXVHNLTH2qekC7jLZ_VqMOA",
  authDomain: "whatsapp-1cbfd.firebaseapp.com",
  databaseURL: "https://whatsapp-1cbfd-default-rtdb.firebaseio.com",
  projectId: "whatsapp-1cbfd",
  storageBucket: "whatsapp-1cbfd.appspot.com",
  messagingSenderId: "110699228173",
  appId: "1:110699228173:web:89ece2e8d15a687b207944",
  measurementId: "G-1WNHL79DYH",
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;
