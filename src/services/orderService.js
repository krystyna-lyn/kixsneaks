import { collection, addDoc, getDocs, deleteDoc, doc, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const createOrder = async ({ userId, items }) => {

    const orderRef = await addDoc(
        collection(db, "orders"),
        {
            userId,
            items,
            createdAt: serverTimestamp()
        }
    );

    return orderRef.id;
};

export const getOrders = async (userId) => {
    const snapshot = await getDocs(
        query(
            collection(db, "orders"),
            where("userId", "==", userId)
        )
    );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const clearCart = async (cartItems) => {

    for (const item of cartItems) {
        await deleteDoc(doc(db, "cart", item.id));
    }

};