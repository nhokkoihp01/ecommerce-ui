// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBY9Usi7jphb0LjLZoNP1kjzD7BL7ef9Cg",
    authDomain: "ecommerce-storage-14c09.firebaseapp.com",
    projectId: "ecommerce-storage-14c09",
    storageBucket: "ecommerce-storage-14c09.appspot.com",
    messagingSenderId: "964565705638",
    appId: "1:964565705638:web:f878584b0a458bd9a5e567",
    measurementId: "G-5SSL5PNV8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
