// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_wr6lQ3_HxmXIlGNISrTPkB74tC81Gl4",
  authDomain: "financly-rec-7adda.firebaseapp.com",
  projectId: "financly-rec-7adda",
  storageBucket: "financly-rec-7adda.firebasestorage.app",
  messagingSenderId: "948466561048",
  appId: "1:948466561048:web:135b3dbbb0e227b2f9136d",
  measurementId: "G-0P4BWEM72B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};