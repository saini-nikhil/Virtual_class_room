// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgCYDnnmPS5Dj1AS9Ffu6qrBQ6g3H4rkc",
    authDomain: "moviee-faa19.firebaseapp.com",
    databaseURL: "https://moviee-faa19-default-rtdb.firebaseio.com",
    projectId: "moviee-faa19",
    storageBucket: "moviee-faa19.firebasestorage.app",
    messagingSenderId: "274453814259",
    appId: "1:274453814259:web:d1c0f76673430819721086"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };
