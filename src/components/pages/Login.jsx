import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Login successful!");

            navigate("/");

        } catch (error) {

            console.error(error);

            switch (error.code) {

                case "auth/invalid-credential":
                    alert("Wrong email or password.");
                    break;

                case "auth/user-not-found":
                    alert("User not found.");
                    break;

                case "auth/wrong-password":
                    alert("Wrong password.");
                    break;

                default:
                    alert(error.message);
            }
        }
    };

    return (
        <AuthForm
            title="Login to your account"
            buttonText="Login"
            onSubmit={handleSubmit}
        >
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Link to="/register">
                Don't have an account? Register
            </Link>

        </AuthForm>
    )

}

export default Login;