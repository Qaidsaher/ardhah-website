// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyA4-TIUUl4iVIVmh61HRduJYYZowT-Ee2w",
    authDomain: "ardhah-a000.firebaseapp.com",
    databaseURL: "https://ardhah-a000-default-rtdb.firebaseio.com",
    projectId: "ardhah-a000",
    storageBucket: "ardhah-a000.appspot.com",
    messagingSenderId: "783282541260",
    appId: "1:783282541260:web:aca24140db2d3ecfb56869",
    measurementId: "G-J631ZNC1YE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Storage
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage };
