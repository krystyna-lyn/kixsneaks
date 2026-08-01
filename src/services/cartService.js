import { db } from "../firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where
} from "firebase/firestore";

export const getCart = async (userId) => {
    const snapshot = await getDocs(
        query(
            collection(db, "cart"),
            where("userId", "==", userId)
        )
    );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const addCartItem = async (cartItem) => {
    const docRef = await addDoc(
        collection(db, "cart"),
        cartItem
    );

    return docRef.id;
};

export const removeCartItem = async (id) => {
    await deleteDoc(doc(db, "cart", id));
};