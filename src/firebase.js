// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkrbhWwlfxlZYniAplS26vOxERLsPg4Ys",
  authDomain: "mydictionary-56fa0.firebaseapp.com",
  projectId: "mydictionary-56fa0",
  storageBucket: "mydictionary-56fa0.appspot.com",
  messagingSenderId: "916870590491",
  appId: "1:916870590491:web:3076c7ff42a961fb9c48be",
  measurementId: "G-ZPVWY77LKS",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
