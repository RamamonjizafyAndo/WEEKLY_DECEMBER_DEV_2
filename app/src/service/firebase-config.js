// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRTrXWU509tdASUy5Q34K9LjvomFb4n30",
  authDomain: "chat-91be5.firebaseapp.com",
  projectId: "chat-91be5",
  storageBucket: "chat-91be5.appspot.com",
  messagingSenderId: "823169405132",
  appId: "1:823169405132:web:9081568a4d74274e98f269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const imgDB  = getStorage(app);
export const data = getFirestore(app);
export const database = getDatabase(app);
