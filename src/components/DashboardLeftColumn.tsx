import React from "react";
import { FaUser, FaUsers, FaClipboardList, FaPlus } from "react-icons/fa";
import { SiGoogledataproc } from "react-icons/si";

import { Team } from "../types";
import { User } from "../types";

interface DashboardLeftColumnProps {
    teams: Team[];
    userData: User | null;
    selectedTeam: Team | null;
    setSelectedTeam: React.Dispatch<React.SetStateAction<Team | null>>;
    selectedItem: { name: string } | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
    isSidebarOpen?: boolean;
    setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardLeftColumn = ({ teams, userData, selectedTeam, setSelectedTeam, selectedItem, setSelectedItem, isSidebarOpen = false }: DashboardLeftColumnProps) => {
    const teamNavItems = [
        { name: "Manage Members", icon: <FaUsers /> },
        { name: "Manage Lead", icon: <SiGoogledataproc /> },
        { name: "Leads", icon: <FaClipboardList /> },
        { name: "Add Lead", icon: <FaPlus /> }
    ]

    return (
        <aside className={`fixed md:static inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 text-grey-400 dark:text-white p-4 w-64 flex-shrink-0 h-screen overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
            {/* Profile Section */}
            <div className="flex items-center mb-8 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <img
                    src="https://avatar.iran.liara.run/public"
                    alt="Profile"
                    className="rounded-full w-12 h-12"
                />
                <div className="ml-4">
                    <h2 className="text-base sm:text-lg font-bold">{userData?.username}</h2>
                    <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300">{userData?.title}</p>
                </div>
            </div>

            {/* Selected Team Section */}
            {selectedTeam &&
            <nav className="mb-8">
                <h3 className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase mb-4">
                    {selectedTeam.title}
                </h3>
                <ul className="space-y-2">
                    {teamNavItems?.map((item) => {
                        if (item.name === "Manage Members" && userData?._id !== selectedTeam?.owner) {
                            return null; // Skip rendering this item
                        }
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => {
                                        setSelectedItem({ name: item.name });
                                    }}
                                    className={`flex items-center w-full text-left p-2 rounded hover:bg-indigo-700 hover:text-white ${
                                        selectedItem?.name === item.name ? "bg-indigo-700 text-white" : ""
                                    }`}
                                >
                                    <span className="mr-3 flex-shrink-0">{item.icon}</span>
                                    <span className="text-sm sm:text-base">{item.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>}

            {/* Team Section */}
            <nav>
                <h3 className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase mb-4">Teams</h3>
                <ul className="space-y-2">
                    <li>
                    <button
                        onClick={() => setSelectedItem({ name: "Create Team" })}
                        className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700 hover:text-white"
                    >
                        <FaPlus className="mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Create Team</span>
                    </button>
                    </li>
                    {teams?.map((team, index) => (
                        <li key={index}>
                            <button
                                onClick={() => {
                                    setSelectedTeam(team);
                                }}
                                className={`flex items-center w-full text-left p-2 rounded hover:bg-indigo-700 hover:text-white ${selectedTeam?._id === team._id ? "bg-indigo-700 text-white" : ""}`}
                            >
                                <FaUser className="mr-3 flex-shrink-0" />
                                <span className="text-sm sm:text-base truncate">{team.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default DashboardLeftColumn;