import React, { useState } from "react";

import { createTeam } from "../services/teamService";
import { Team } from "../types";

interface CreateTeamProps {
    setSelectedTeam: React.Dispatch<React.SetStateAction<Team | null>>;
    setSelectedItem: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    updateTeams: () => Promise<void>;
}

const CreateTeam = ({setSelectedTeam, setSelectedItem, setTeams, updateTeams} : CreateTeamProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleCreateTeam = async () => {
        if (title.trim() && description.trim()) {
            try {
                const res = await createTeam({ title, description });
                alert("Team created successfully:");
                setTeams((prevTeams) => [...prevTeams, res.team]);
                setSelectedTeam(res.team);
                setSelectedItem({ name: "Leads" });
                updateTeams();

            } catch (error) {
                console.error("Failed to create team:", error);
                setError("Failed to create team. Please try again.");
            }
        } else {
            setError("Both title and description are required.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 flex flex-col items-center">
            <div className="w-full max-w-sm sm:max-w-md">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                    Create Team
                </h1>
                <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <input
                        type="text"
                        placeholder="Enter team title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Enter team description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                    {error && (
                        <p className="text-red-500 text-xs sm:text-sm">{error}</p>
                    )}
                    <button
                        onClick={handleCreateTeam}
                        className="px-4 py-2 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
                    >
                        Create Team
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTeam;