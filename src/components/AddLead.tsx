import React, { useState } from "react";

import { Team } from "../types";
import { Client } from "../types";

import { createLead } from "../services/leadService";
import { createClient, getClientsByTeamAndPhone } from "../services/clientService";

interface AddLeadProps {
    selectedTeam: Team | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
}

const AddLead = ({ selectedTeam, setSelectedItem }: AddLeadProps) => {
    const [clientPhone, setClientPhone] = useState("");
    const [searchedClients, setSearchedClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [newClient, setNewClient] = useState<Client | null>(() => {
        return {
            team: selectedTeam?._id,
            fullName: "",
            phone: "",
            email: "",
            businessName: "",
            merchantHistory: "",
            note: "",
        };
    });
    const [isCreatingClient, setIsCreatingClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchClient = async () => {
        try {
            setIsLoading(true);
            const clients = await getClientsByTeamAndPhone(selectedTeam?._id ?? "", clientPhone);
            setSearchedClients(clients);
        } 
        catch (error) {
            console.error("Failed to search client:", error);
            alert("Client not found. You can create a new client.");
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleCreateClient = async () => {
        if (!selectedTeam) return alert("No team selected.");
        try {
            setIsLoading(true);
            if (!newClient) return alert("Please fill in all fields.");
            newClient.deposit = parseFloat(String(newClient.deposit || "0"));
            newClient.lookingFor = parseFloat(String(newClient.lookingFor || "0"));
            newClient.creditScore = parseFloat(String(newClient.creditScore || "0"));
            newClient.existingLoan = parseFloat(String(newClient.existingLoan || "0"));
            const res = await createClient(newClient);
            setSearchedClients([res.client]);
            setSelectedClient(res.client);
            setIsCreatingClient(false);
            alert("Client created successfully.");
        } 
        catch (error) {
            console.error("Failed to create client:", error);
            alert((error as any).response?.data?.message || "Failed to create client. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleCreateLead = async () => {
        if (!selectedTeam || !selectedClient) return alert("Please select a team and client.");
        try {
            setIsLoading(true);
            await createLead({
                team: selectedTeam?._id ?? "",
                client: selectedClient?._id ?? "",
            });
            alert("Lead created successfully.");
            setSelectedItem({ name: "Leads" });
        } 
        catch (error) {
            console.error("Failed to create lead:", error);
            alert("Failed to create lead. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };

    const setNewClientField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewClient((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 flex flex-col items-center">
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-100"></div>
                </div>
            )}
            
            <div className="w-full max-w-sm sm:max-w-md">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                    Add Lead
                </h1>
                {!isCreatingClient ? (
                    <>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
                            <input
                                type="text"
                                placeholder="Search client by phone"
                                value={clientPhone}
                                onChange={(e) => setClientPhone(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSearchClient}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
                            >
                                Search
                            </button>
                        </div>
                        {searchedClients.length > 0 && (
                            <div className="max-h-40 overflow-y-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-md shadow-md mb-6">
                                {searchedClients.map((client) => (
                                    <div
                                        key={client._id}
                                        onClick={() => setSelectedClient(client)}
                                        className={`p-2 rounded-md cursor-pointer ${
                                            selectedClient?._id === client._id
                                                ? "bg-blue-500 text-white"
                                                : "hover:bg-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        <p>
                                            <strong>Name:</strong> {client.fullName}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> {client.phone}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setSearchedClients([]);
                                setSelectedClient(null);
                                setClientPhone("");
                                setIsCreatingClient(true);
                            }}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium"
                        >
                            Create New Client
                        </button>
                    </>
                ) : (
                    <div className="space-y-4 mb-6">
                        <input
                            name="fullName"
                            type="text"
                            placeholder="Full Name"
                            value={newClient?.fullName}
                            onChange={setNewClientField}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="phone"
                            type="text"
                            placeholder="Phone"
                            value={newClient?.phone}
                            onChange={setNewClientField}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={newClient?.email}
                            onChange={setNewClientField}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="businessName"
                            type="text"
                            placeholder="Business Name"
                            value={newClient?.businessName}
                            onChange={setNewClientField}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="deposit"
                            type="number"
                            placeholder="Deposit"
                            value={newClient?.deposit}
                            onChange={setNewClientField}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="lookingFor"
                            type="number"
                            placeholder="Looking For"
                            value={newClient?.lookingFor}
                            onChange={setNewClientField}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="creditScore"
                            type="number"
                            placeholder="Credit Score"
                            value={newClient?.creditScore}
                            onChange={setNewClientField}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="esixtingLoan"
                            type="number"
                            placeholder="Existing Loan"
                            value={newClient?.existingLoan}
                            onChange={setNewClientField}
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleCreateClient}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium"
                        >
                            Save Client
                        </button>
                        <button
                            onClick={() => setIsCreatingClient(false)}
                            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-md font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <button
                    onClick={handleCreateLead}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
                    disabled={!selectedClient}
                >
                    Create Lead
                </button>
            </div>
        </div>
    );
};

export default AddLead;