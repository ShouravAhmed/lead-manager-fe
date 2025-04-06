import React, { useState } from "react";
import { FiX } from "react-icons/fi";

import { Team } from "../types";

import { addMemberToTeam } from "../services/teamService";

interface ManageMemberProps {
    setSelectedTeam: React.Dispatch<React.SetStateAction<Team | null>>;
    selectedTeam: Team | null;
}

const ManageMembers = ({ selectedTeam, setSelectedTeam } : ManageMemberProps) => {
    const [email, setEmail] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

    const handleAddMember = async () => {
        if (email.trim() && selectedTeam && !selectedTeam.members?.some((member) => member.email === email)) {
            try {
                if (selectedTeam._id) {
                    const res = await addMemberToTeam(selectedTeam._id, { email });
                    setSelectedTeam(res.team);
                    setEmail("");
                    alert("Member added successfully.");
                } 
                else {
                    alert("Team ID is missing. Cannot add member.");
                }
            } 
            catch (error) {
                console.error("Failed to add member:", error);
                if ((error as any)?.response?.data?.message) {
                    alert((error as any).response.data.message);
                } else {
                    alert("Failed to add member. Please try again.");
                }
            }
        }
    };

    const handleDeleteMember = (member: string) => {
        setMemberToDelete(member);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (memberToDelete) {
            setMemberToDelete(null);
            setShowConfirm(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 flex flex-col items-center">
            <div className="w-full max-w-sm sm:max-w-md">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                    Manage Members
                </h1>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddMember}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
                    >
                        Add Member
                    </button>
                </div>
                <ul className="space-y-4">
                    {selectedTeam?.members?.map((member) => (
                        <li
                            key={member._id}
                            className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 p-4 rounded-md shadow-md"
                        >
                            <span className="break-words">{member.username}</span>
                            <button
                                onClick={() => member.email && handleDeleteMember(member.email)}
                                className="text-red-500 hover:text-red-600"
                            >
                                <FiX size={20} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-md shadow-md text-center w-full max-w-sm">
                        <p className="mb-4 text-gray-900 dark:text-white">
                            Are you sure you want to delete this member?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-md font-medium"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMembers;