import React, { ReactNode, useState, useEffect } from "react";
import { FaUser, FaUsers, FaClipboardList, FaPlus, FaPhoneSlash, FaPhone, FaRedo, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const DashboardLeftColumn = () => {
    const navigate = useNavigate();
    const [selectedTeam, setSelectedTeam] = useState<{ id: string; name: string } | null>(() => {
        const storedTeam = localStorage.getItem("selectedTeam");
        return storedTeam ? JSON.parse(storedTeam) : null;
    });

    const [selectedItem, setSelectedItem] = useState<{ name: string } | null>(() => {
        const storedItem = localStorage.getItem("selectedItem");
        return storedItem ? JSON.parse(storedItem) : { name: "My Leads" };
    });

    const demoTeams =
    [
        { id: "team-1", name: "Team Alpha" },
        { id: "team-2", name: "Team Beta" },
        { id: "team-3", name: "Team Gamma" },
    ];

    const demoItems = 
    [
        { name: "Manage Members", icon: <FaUsers /> },
        { name: "Team Leads", icon: <FaClipboardList /> },
        { name: "My Leads", icon: <FaClipboardList /> },
        { name: "Add Lead", icon: <FaPlus /> },
        { name: "Unattended", icon: <FaPhoneSlash /> },
        { name: "Callback", icon: <FaPhone /> },
        { name: "Followup", icon: <FaRedo /> },
        { name: "Sale Made", icon: <FaCheck /> },
        { name: "Declined Sale", icon: <FaTimes />},
    ]
        
    useEffect(() => {
        localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
    }, [selectedTeam]);

    useEffect(() => {
        if(selectedItem?.name === "Add Lead") return;
        localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    }, [selectedItem]);

    

    return (
        <aside className="bg-white dark:bg-gray-800 text-grey-400 dark:text-white p-4 sm:w-64 flex-shrink-0 h-screen overflow-y-auto">
            {/* Profile Section */}
            <div className="flex items-center mb-8 sticky top-0 bg-white dark:bg-gray-800 z-10 p-4">
                <img
                    src="https://avatar.iran.liara.run/public"
                    alt="Profile"
                    className="rounded-full w-12 h-12"
                />
                <div className="ml-4">
                    <h2 className="text-lg font-bold">John Doe</h2>
                    <p className="text-sm text-blue-600 dark:text-blue-300">Sales Manager</p>
                </div>
            </div>

            {/* Selected Team Section */}
            {selectedTeam &&
            <nav className="mb-8">
                <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase mb-4">{selectedTeam.name}</h3>
                <ul className="space-y-2">
                    {demoItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => {
                                    setSelectedItem({ name: item.name });
                                }}
                                className={`flex items-center w-full text-left p-2 rounded hover:bg-indigo-700 hover:text-white ${
                                    selectedItem?.name === item.name ? "bg-indigo-700 text-white" : ""
                                }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                <span className="hidden sm:inline">{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>}

            {/* Team Section */}
            <nav>
                <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase mb-4">Teams</h3>
                <ul className="space-y-2">
                    <li>
                    <button
                        onClick={() => navigate("/create-team")}
                        className="flex items-center w-full text-left p-2 rounded hover:bg-indigo-700 hover:text-white"
                    >
                        <FaPlus className="mr-3" />
                        <span className="hidden sm:inline">Create Team</span>
                    </button>
                    </li>
                    {
                    demoTeams.map((team: { id: string; name: string }) => (
                        <li key={team.id}>
                        <button
                            onClick={() => {
                            setSelectedTeam(team);
                            }}
                            className={`flex items-center w-full text-left p-2 rounded hover:bg-indigo-700 hover:text-white ${selectedTeam?.id === team.id ? "bg-indigo-700 text-white" : ""}`}
                        >
                            <FaUser className="mr-3" />
                            <span className="hidden sm:inline">{team.name}</span>
                        </button>
                        </li>
                    ))
                    }
                </ul>
            </nav>
        </aside>
    );
}

export default DashboardLeftColumn;