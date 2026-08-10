import {
    collection,
    getDocs,
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../firebase";

export const getProducts = async () => {
    const snapshot = await getDocs(
        collection(db, "items")
    );

    return snapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            imgUrl: data.imgUrl.replace("./", "/")
        };
    });
};

export const getProductById = async (id) => {
    const productRef = doc(db, "items", id);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
        return null;
    }

    return {
        id: productSnapshot.id,
        ...productSnapshot.data(),
        imgUrl: productSnapshot.data().imgUrl.replace("./", "/")
    };
};