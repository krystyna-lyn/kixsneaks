import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            toast.success("Login successful!");

            navigate(from, { replace: true });

        } catch (error) {

            console.error(error);

            switch (error.code) {

                case "auth/invalid-credential":
                    toast.error("Wrong email or password.");
                    break;

                case "auth/user-not-found":
                    toast.error("User not found.");
                    break;

                case "auth/wrong-password":
                    toast.error("Wrong password.");
                    break;

                default:
                    toast.error(error.message);
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