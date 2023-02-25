import firebase from 'firebase/app';
import 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6IPoST1OhLZcLcDyQYKhjMaQSIZm7xnQ",
    authDomain: "jdrv2-dee36.firebaseapp.com",
    projectId: "jdrv2-dee36",
    storageBucket: "jdrv2-dee36.appspot.com",
    messagingSenderId: "545926304581",
    appId: "1:545926304581:web:cf84777e1f6d6a3554242c",
    measurementId: "G-3CWLHT015D"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();