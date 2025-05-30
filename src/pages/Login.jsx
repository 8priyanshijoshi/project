import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state
        setLoading(true); // Prevent multiple clicks

        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home"); // Ensure the "/home" route is correctly set up in App.js
        } catch (e) {
            setError("Invalid email or password. Please try again.");
            console.error(e);
        }

        setLoading(false);
    };

    return (
        <div className="w-50">
            {error && <div className="text-danger">{error}</div>}
            <form onSubmit={handleLogin} className="flex flex-col justify-center items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 ml-100 text-gray-800">
                <div className="inline-flex items-center gap-2 mb-2">
                    <p className="prata-regular text-3xl">Login</p>
                </div>

                <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4" disabled={loading}>
                    {loading ? "Logging in..." : "Submit"}
                </button>

                <Link to="/Register" className="mx-2">New User?</Link>
            </form>
        </div>
    );
};

export default Login;

