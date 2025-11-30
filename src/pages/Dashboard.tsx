import { useState, useEffect } from "react";

import DashboardLeftColumn from "../components/DashboardLeftColumn";

import { getAllTeams } from "../services/teamService";
import { getUserDetails } from "../services/authService";

import { Team } from "../types";
import { User } from "../types";

import ManageMembers from "../components/ManageMembers";
import CreateTeam from "../components/CreateTeam";
import AddLead from "../components/AddLead";
import Leads from "../components/Leads";
import ManageLead from "../components/ManageLead";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [selectedTeam, setSelectedTeam] = useState<Team | null>(() => {
        const storedTeam = localStorage.getItem("selectedTeam");
        return storedTeam ? JSON.parse(storedTeam) : null;
    });

    const [selectedItem, setSelectedItem] = useState<{ name: string } | null>(() => {
        const storedItem = localStorage.getItem("selectedItem");
        if(storedItem) return JSON.parse(storedItem);
        try{
            if(selectedItem) return { name: "Leads" };
        }
        catch (error) {
            console.error("selectedItem is not defined");
        }
        return null;
    });

    const [teams, setTeams] = useState<Team[]>([]);
    const updateTeams = async () => {
        const teams = await getAllTeams();
        setTeams(teams);
    };
    useEffect(() => {
        const storedTeams = localStorage.getItem('teams') ? JSON.parse(localStorage.getItem('teams')!) : null;
        setTeams(storedTeams);
        updateTeams();
    }, []);

    const [userData, setUserData] = useState<User | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
        setUserData(storedUser);
        getUserDetails();
    }, []);

    useEffect(() => {
        if(!selectedTeam)  return;
        localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
        setSelectedItem({ name: "Leads" });
        localStorage.removeItem("selectedLead");
    }, [selectedTeam]);

    useEffect(() => {
        if(selectedItem?.name === "Add Lead" || selectedItem?.name == "Create Team") return;
        localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    }, [selectedItem]);

    useEffect(() => {
        if (selectedTeam) {
            const updatedTeam = teams.find(team => team._id === selectedTeam._id);
            if (updatedTeam) {
                setSelectedTeam(updatedTeam);
            }
        }
    }, [teams]);

    return (
        <div className="flex min-h-screen h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Left Column */}
            <DashboardLeftColumn 
                teams={teams} 
                userData={userData} 
                selectedTeam={selectedTeam} 
                setSelectedTeam={setSelectedTeam} 
                selectedItem={selectedItem} 
                setSelectedItem={(item) => {
                    setSelectedItem(item);
                    setIsSidebarOpen(false); // Close sidebar on mobile when item is selected
                }}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* Right Column */}
            <main className="flex-grow overflow-y-auto h-full w-full md:w-auto">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="fixed top-4 left-4 z-30 md:hidden p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isSidebarOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {selectedItem?.name === "Manage Members" && <ManageMembers setSelectedTeam={setSelectedTeam}  selectedTeam={selectedTeam}/>}
                {selectedItem?.name === "Create Team" && <CreateTeam  setSelectedTeam={setSelectedTeam} setSelectedItem={setSelectedItem} setTeams={setTeams} updateTeams={updateTeams} />}
                {selectedItem?.name === "Leads" && <Leads setSelectedItem={setSelectedItem} currentUser={userData} selectedTeam={selectedTeam} />}
                {selectedItem?.name === "Add Lead" && <AddLead selectedTeam={selectedTeam} setSelectedItem={setSelectedItem} />}
                {selectedItem?.name === "Manage Lead" && <ManageLead />}
            </main>
        </div>
    );
}

export default Dashboard;
