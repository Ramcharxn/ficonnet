// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE8EFqywF5KObteWFyFKmWLLPhCVQorio",
  authDomain: "hospital-b3791.firebaseapp.com",
  projectId: "hospital-b3791",
  storageBucket: "hospital-b3791.appspot.com",
  messagingSenderId: "1059646335143",
  appId: "1:1059646335143:web:5c6f40d9b00a2ce1b1d382"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase