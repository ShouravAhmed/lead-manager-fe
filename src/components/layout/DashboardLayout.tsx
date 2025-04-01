import React, { ReactNode } from "react";
import { FaUser, FaUsers, FaClipboardList, FaPlus, FaPhoneSlash, FaPhone, FaRedo, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const DashboardLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Left Column */}
            <aside className="bg-indigo-900 dark:bg-gray-800 text-white p-4 sm:w-64 flex-shrink-0">
                {/* Profile Section */}
                <div className="flex items-center mb-8">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Profile"
                        className="rounded-full w-12 h-12"
                    />
                    <div className="ml-4">
                        <h2 className="text-lg font-bold">John Doe</h2>
                        <p className="text-sm text-indigo-300">Sales Manager</p>
                    </div>
                </div>

                {/* Selected Team Section */}
                <nav className="mb-8">
                    <h3 className="text-sm font-semibold text-indigo-300 uppercase mb-4">Selected Team</h3>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => navigate("/manage-members")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaUsers className="mr-3" />
                                <span className="hidden sm:inline">Manage Members</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/team-leads")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaClipboardList className="mr-3" />
                                <span className="hidden sm:inline">Team Leads</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/my-leads")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaClipboardList className="mr-3" />
                                <span className="hidden sm:inline">My Leads</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/add-lead")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaPlus className="mr-3" />
                                <span className="hidden sm:inline">Add Lead</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/unattended")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaPhoneSlash className="mr-3" />
                                <span className="hidden sm:inline">Unattended</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/callback")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaPhone className="mr-3" />
                                <span className="hidden sm:inline">Callback</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/followup")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaRedo className="mr-3" />
                                <span className="hidden sm:inline">Followup</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/sale-made")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaCheck className="mr-3" />
                                <span className="hidden sm:inline">Sale Made</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/declined-sale")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaTimes className="mr-3" />
                                <span className="hidden sm:inline">Declined Sale</span>
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Team Section */}
                <nav>
                    <h3 className="text-sm font-semibold text-indigo-300 uppercase mb-4">Teams</h3>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => navigate("/team-1")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaUsers className="mr-3" />
                                <span className="hidden sm:inline">Team Alpha</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/team-2")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaUsers className="mr-3" />
                                <span className="hidden sm:inline">Team Beta</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/team-3")}
                                className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700"
                            >
                                <FaUsers className="mr-3" />
                                <span className="hidden sm:inline">Team Gamma</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Right Column */}
            <main className="flex-grow p-8">
                <h1>CHILDREN</h1>
            </main>
        </div>
    );
}

export default DashboardLayout;