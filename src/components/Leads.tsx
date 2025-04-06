import React, { useState, useEffect, useReducer } from "react";
import { Lead, Team, User } from "../types";
import { getLeadsByTeam } from "../services/leadService";

interface LeadProps {
    selectedTeam: Team | null;
    currentUser: User | null;
}

const Leads = ({ selectedTeam, currentUser }: LeadProps) => {
    const [filter, setFilter] = useState<string>("");
    const [allLeads, setAllLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showMyLeads, setShowMyLeads] = useState<boolean>(false);

    useEffect(() => {
        const fetchLeads = async () => {
            if (!selectedTeam) {
                setAllLeads([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const params: any = {};
                if (showMyLeads) params.currentOwner = true;

                if (filter === "Processing") {
                    params.status = "Processing";
                } else if (filter === "Callback") {
                    params.status = "CallbackRequested";
                } else if (filter === "Followup") {
                    params.status = "Followup";
                } else if (filter === "Sale Made") {
                    params.status = "Sale Made";
                } else if (filter === "Declined Sale") {
                    params.status = "Declined Sale";
                }
                let fetchedLeads = await getLeadsByTeam(selectedTeam._id ?? "", params);
                
                if (filter === "Callback" || filter === "Followup") {
                    fetchedLeads = fetchedLeads.sort((a: Lead, b: Lead) => {
                        const dateA = new Date(a.followupAt || 0).getTime();
                        const dateB = new Date(b.followupAt || 0).getTime();
                        return dateA - dateB;
                    });
                }

                setAllLeads(fetchedLeads);
            } catch (error) {
                console.error("Failed to fetch leads:", error);
                setAllLeads([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, [selectedTeam, filter, showMyLeads]);

    useEffect(() => {
        setFilter("");
    }, [showMyLeads]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                    Manage Leads
                </h1>
                <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
                    <button
                        onClick={() => setShowMyLeads(false)}
                        className={`px-4 py-2 rounded-md font-medium ${
                            !showMyLeads
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                        } hover:bg-blue-600`}
                    >
                        Team Leads
                    </button>
                    <button
                        onClick={() => setShowMyLeads(true)}
                        className={`px-4 py-2 rounded-md font-medium ${
                            showMyLeads
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                        } hover:bg-blue-600`}
                    >
                        My Leads
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
                    {[
                        "Processing",
                        "Callback",
                        "Followup",
                        "Sale Made",
                        "Declined Sale",
                    ].map((btn) => (
                        <button
                            key={btn}
                            onClick={() => setFilter(btn)}
                            className={`px-4 py-2 rounded-md font-medium ${
                                filter === btn
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                            } hover:bg-blue-600`}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
                {loading ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                        Loading leads...
                    </p>
                ) : !Array.isArray(allLeads) || allLeads.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                        No leads found for the selected filter.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Client Name</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Phone</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Business Name</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Current Owner</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Status</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Follow Up At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allLeads?.map((lead) => (
                                    <tr key={lead._id} className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {lead.client?.fullName || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {lead.client?.phone || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {lead.client?.businessName || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {lead.currentOwner?.username || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {lead.status || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {lead.followupAt ? new Date(lead.followupAt).toLocaleDateString() : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leads;