import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
    doc,
    serverTimestamp,
    setDoc
} from "firebase/firestore";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";


function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            // create user 
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            // get uid of the created user from Firebase Authentication
            const user = userCredential.user;

            // save user id and any other user data in Firebase Realtime Database
            await setDoc(
                doc(db, "users", user.uid),
                {
                    name,
                    email,
                    createdAt: serverTimestamp()
                }
            );
            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    };


    return (
        <AuthForm
            title="Create account"
            buttonText="Register"
            onSubmit={handleSubmit}
        >

            <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setName(e.target.value)}
            />

        </AuthForm>

    )


}
export default Register;
