import React, { useState, useEffect } from "react";
import { Lead, Team, User } from "../types";
import { getLeadsByTeam } from "../services/leadService";

interface LeadProps {
    selectedTeam: Team | null;
    currentUser: User | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
}

const Leads = ({ selectedTeam, setSelectedItem }: LeadProps) => {
    const [filter, setFilter] = useState<string>("");
    const [allLeads, setAllLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showMyLeads, setShowMyLeads] = useState<boolean>(true);

    const formatStatus = (status?: string): string => {
        if (!status) return "N/A";
        if (status === "SaleMade") return "Sale Made";
        if (status === "DeclinedSale") return "Declined Sale";
        if (status === "CallbackRequested") return "Callback Requested";
        return status;
    };

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
                    params.status = "SaleMade";
                } else if (filter === "Declined Sale") {
                    params.status = "DeclinedSale";
                }
                let fetchedLeads = await getLeadsByTeam(selectedTeam._id ?? "", params);
                
                // Backend now handles all sorting with advanced multi-level sorting scheme
                // No client-side sorting needed

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
            <div className="w-full max-w-7xl">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                    Leads
                </h1>
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center sm:justify-start">
                    <button
                        onClick={() => setShowMyLeads(false)}
                        className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium ${
                            !showMyLeads
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                        } hover:bg-blue-600`}
                    >
                        Team Leads
                    </button>
                    <button
                        onClick={() => setShowMyLeads(true)}
                        className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium ${
                            showMyLeads
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                        } hover:bg-blue-600`}
                    >
                        My Leads
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center sm:justify-start">
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
                            className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium ${
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
                    <>
                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {allLeads?.map((lead) => (
                                <div
                                    key={lead._id}
                                    onClick={() => {
                                        localStorage.setItem("selectedLead", JSON.stringify(lead));
                                        setSelectedItem({ name: "Manage Lead" });
                                    }}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                {lead.client?.fullName || "N/A"}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                lead.status === "SaleMade" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                                                lead.status === "DeclinedSale" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                                                lead.status === "Processing" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                                                lead.status === "CallbackRequested" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                                                "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                            }`}>
                                                {formatStatus(lead.status)}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                            <p><span className="font-medium">Phone:</span> {lead.client?.phone || "N/A"}</p>
                                            <p><span className="font-medium">Business:</span> {lead.client?.businessName || "N/A"}</p>
                                            <p><span className="font-medium">Owner:</span> {lead.currentOwner?.username || "N/A"}</p>
                                            {lead.followupAt && (
                                                <p><span className="font-medium">Follow Up:</span> {new Date(lead.followupAt).toLocaleDateString()}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle">
                                <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
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
                                        <tr key={lead._id} className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                                            onClick={() => {
                                                localStorage.setItem("selectedLead", JSON.stringify(lead));
                                                setSelectedItem({ name: "Manage Lead" });
                                            }}>
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
                                                {formatStatus(lead.status)}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                                {lead.followupAt ? new Date(lead.followupAt).toLocaleDateString() : "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Leads;