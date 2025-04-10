import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, sendOtp } from "../services/authService";
import { isAuthenticated } from '../services/authService';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuthenticated()) {
            navigate("/dashboard");
        }
    }, []);  

    const sendErrorAlert = (error: any) => {
        if ((error as any)?.response?.data?.message) {
            if (error instanceof Error && (error as any)?.response?.data?.message) {
                alert((error as any).response.data.message);
            } else {
                alert("An unexpected error occurred.");
            }
        } else {
            alert("An unexpected error occurred.");
        }
    };

    const handleSendOtp = async () => {
        try {
            const res = await sendOtp(email);
            if (res.message) alert(res.message);
            setStep(2);
        } 
        catch (error) {
            console.error("Error sending OTP:", error);
            sendErrorAlert(error);
        }
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const res = await register({ email, otp, username, password, confirm_password: confirmPassword });
            if (res.message) alert(res.message);
            navigate("/login");
        } 
        catch (error) {
            console.error("Error during signup:", error);
            sendErrorAlert(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col justify-center" style={{ minHeight: "500px" }}>
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">Signup</h2>
                {step === 1 && (
                    <div className="flex flex-col items-center">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            placeholder="Enter your email"
                        />
                        <button
                            onClick={handleSendOtp}
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Send OTP
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div className="flex flex-col items-center">
                        <p className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                            <span className="font-medium">{email}</span>
                        </p>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            placeholder="Enter OTP"
                        />
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            placeholder="Enter your username"
                        />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            placeholder="Enter your password"
                        />
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            placeholder="Confirm your password"
                        />
                        <button
                            onClick={handleSignup}
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Signup
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
