import React from "react";
import { useNavigate } from "react-router-dom";

import DashboardLeftColumn from "../components/DashboardLeftColumn";

const Team = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Left Column */}
            <DashboardLeftColumn />

            {/* Right Column */}
            <main className="flex-grow p-8 overflow-y-auto h-full">
                <h1>CHILDREN</h1>
            <ul>
                {Array.from({ length: 100 }, (_, index) => (
                    <li key={index} className="mb-2">
                        Item {index + 1}
                    </li>
                ))}
            </ul>
            </main>
        </div>
    );
}

export default Team;
