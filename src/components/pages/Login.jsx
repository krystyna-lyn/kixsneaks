import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {

            alert('Login Successfull');
        } else {
            alert('Invalid Credentials');
        }

    }

    return (
        <div className="d-flex flex-column justify-center align-center">
            <h1>Login</h1>
            <form className="form d-flex flex-column justify-center align-center"
                onSubmit={handleSubmit}>

                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="greenButton">Login</button>
            </form>
            <Link className="register" to='/register'>Register</Link>
        </div>
    )

}

export default Login;