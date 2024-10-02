import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        // store data in Localstorage
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Success! now you can log in!');
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column justify-center align-center">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="form d-flex flex-column justify-center align-center">
                <input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" />
                <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="greenButton" onClick={() => console.log(name, email)}>Register</button>
            </form>
        </div>
    )


}
export default Register;
