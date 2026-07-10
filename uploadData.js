import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import dbData from "./db.json" with { type: "json" };

const firebaseConfig = {
    apiKey: "AIzaSyBHZ5WXsZXfop4WUSIl6tVpb1NqB-2Rr58",
    authDomain: "kixsneaks.firebaseapp.com",
    projectId: "kixsneaks",
    storageBucket: "kixsneaks.firebasestorage.app",
    messagingSenderId: "955689877754",
    appId: "1:955689877754:web:616b1056d5c447c85f4943",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadCollection(name, data) {
    for (const item of data) {
        const { id, ...rest } = item;
        await setDoc(doc(db, name, String(id)), rest);
        console.log(`✅ ${name}/${id}`);
    }
}

async function uploadAll() {
    await uploadCollection("items", dbData.items);
    await uploadCollection("cart", dbData.cart);
    await uploadCollection("favorite", dbData.favorite);
    await uploadCollection("orders", dbData.orders);

    console.log("🎉 All data is uploaded!");
}

uploadAll().catch(console.error);