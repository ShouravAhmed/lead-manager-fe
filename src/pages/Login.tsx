import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { isAuthenticated } from '../services/authService';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated()) {
            navigate("/dashboard");
        }
    }, []);  

    const handleLogin = async () => {
        try {
            const res = await login({ username: email, password });
            if(res.message) alert(res.message);
            navigate("/dashboard");
        } 
        catch (error) {
            console.error("Error during login:", error);
            alert("Invalid email or password!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col justify-center" style={{ minHeight: "400px" }}>
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">Login</h2>
                <div className="flex flex-col items-center">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        placeholder="Enter your email or username"
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        placeholder="Enter your password"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}