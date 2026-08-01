import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getUserProfile } from "../services/userService";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            setUser(currentUser);

            if (currentUser) {

                const profile = await getUserProfile(currentUser.uid);
                setUserProfile(profile);

            } else {

                setUserProfile(null);

            }

            setLoading(false);

        });

        return unsubscribe;

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                userProfile,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;