import { db } from "../firebase";
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

export const getFavorites = async (userId) => {
    const snapshot = await getDocs(
        query(
            collection(db, "favorite"),
            where("userId", "==", userId)
        )
    );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};


export const addFavorite = async (favoriteItem) => {
    const docRef = await addDoc(
        collection(db, "favorite"),
        favoriteItem
    );

    return docRef.id;
};

export const removeFavorite = async (id) => {
    await deleteDoc(doc(db, "favorite", id));
};