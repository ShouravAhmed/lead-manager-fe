import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="mb-20 text-center pt-20">
                <h1 className="text-6xl font-extrabold text-indigo-900 dark:text-white">404 - Page Not Found</h1>
                <p className="text-indigo-700 dark:text-gray-300 mt-8 text-2xl">
                    Oops! The page you are looking for does not exist.
                </p>
                <p className="text-indigo-700 dark:text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
                    Please check the URL or go back to the <Link to="/">homepage</Link>.
                </p>
            </header>

            {/* Footer */}
            <footer className="bg-indigo-900 dark:bg-gray-800 text-white py-12 mt-20">
                <div className="text-center">
                    <p className="text-lg">&copy; {new Date().getFullYear()} EdgeLead. All rights reserved.</p>
                    <a href="/privacy" className="text-indigo-300 dark:text-gray-400 hover:text-white text-lg">Privacy Policy</a> | 
                    <a href="/privacy" className="text-indigo-300 dark:text-gray-400 hover:text-white text-lg">Privacy Policy</a> |{" "}
                    <a href="/terms" className="text-indigo-300 dark:text-gray-400 hover:text-white text-lg">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
}
