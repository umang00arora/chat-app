import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAafWUm_gufpEFykeWkyQWXsT4erA4-9uo",
  authDomain: "chat-web-app-916b2.firebaseapp.com",
  databaseURL: "https://chat-web-app-916b2-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-916b2",
  storageBucket: "chat-web-app-916b2.appspot.com",
  messagingSenderId: "916011543803",
  appId: "1:916011543803:web:ca1a3b5a1c34df8596145e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();