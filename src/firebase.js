import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBHZ5WXsZXfop4WUSIl6tVpb1NqB-2Rr58",
    authDomain: "kixsneaks.firebaseapp.com",
    projectId: "kixsneaks",
    storageBucket: "kixsneaks.firebasestorage.app",
    messagingSenderId: "955689877754",
    appId: "1:955689877754:web:616b1056d5c447c85f4943",
    measurementId: "G-DF5W9S8SPD",
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);