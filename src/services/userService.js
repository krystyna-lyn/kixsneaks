import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';


export const getUserProfile = async (uid) => {
    const useRef = doc(db, 'users', uid)
    const userSnap = await getDoc(useRef);
    if (!userSnap.exists()) {
        return null;
    }
    return userSnap.data();
}