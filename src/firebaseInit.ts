// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions } from "firebase/app";
import { getDatabase } from 'firebase/database';
// import { FirebaseOptions } from '@firebase/app';

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCliqfxEvg__OZHfVBwedI2nkxXSZUz0ao",
    authDomain: "rxjs-practice-94c8c.firebaseapp.com",
    projectId: "rxjs-practice-94c8c",
    storageBucket: "rxjs-practice-94c8c.appspot.com",
    messagingSenderId: "545154942090",
    appId: "1:545154942090:web:00e836a96fab553b249973",
    databaseURL: 'https://rxjs-practice-94c8c-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
