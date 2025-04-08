import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lead, Client, User } from "../types";
import {
    updateLead,
    addCommentToLead,
    updateLeadCurrentOwner,
} from "../services/leadService";
import { updateClient } from "../services/clientService";

interface ManageLeadProps {
    setSelectedItem: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
}

const ManageLead = ({ setSelectedItem }: ManageLeadProps) => {
    const navigate = useNavigate();
    const [selectedLead, setSelectedLead] = useState<Lead | null>(() => {
        const storedLead = localStorage.getItem("selectedLead");
        return storedLead ? JSON.parse(storedLead) : null;
    });
    const [client, setClient] = useState<Client | null>(selectedLead?.client || null);
    const [newComment, setNewComment] = useState<string>("");
    const [editingComment, setEditingComment] = useState<{ id: string; text: string } | null>(null);
    const [currentOwnerEmail, setCurrentOwnerEmail] = useState<string>("");

    const handleClientUpdate = async () => {
        if (client && client._id) {
            await updateClient(client._id, client);
            alert("Client updated successfully!");
        }
    };

    const handleLeadUpdate = async (field: Partial<Lead>) => {
        if (selectedLead && selectedLead._id) {
            const updatedLead = await updateLead(selectedLead._id, {
                ...field,
                followupAt: field.followupAt instanceof Date ? field.followupAt.toISOString() : field.followupAt,
            });
            setSelectedLead(updatedLead);
            alert("Lead updated successfully!");
        }
    };

    const handleAddComment = async () => {
        if (selectedLead && selectedLead._id && newComment.trim()) {
            const updatedLead = await addCommentToLead(selectedLead._id, { comment: newComment });
            setSelectedLead(updatedLead);
            setNewComment("");
        }
    };

    const handleUpdateComment = async () => {
        if (selectedLead && selectedLead._id && editingComment) {
            const updatedLead = await addCommentToLead(selectedLead._id, { comment: editingComment.text });
            setSelectedLead(updatedLead);
            setEditingComment(null);
        }
    };

    const handleUpdateCurrentOwner = async () => {
        if (selectedLead && selectedLead._id && currentOwnerEmail.trim()) {
            const updatedLead = await updateLeadCurrentOwner(selectedLead._id, { email: currentOwnerEmail });
            setSelectedLead(updatedLead);
            setCurrentOwnerEmail("");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 flex flex-col items-center">
            {selectedLead ?
            <div className="w-full max-w-lg sm:max-w-xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Manage Lead</h1>

                {/* Lead Details */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Lead Details</h2>
                    <div className="flex flex-wrap space-x-4 mb-7">
                        <div>
                            <label className="block text-sm font-medium">Created By:</label>
                            <span className="ml-2 text-xs">{selectedLead?.createdBy?.username}</span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Created At:</label>
                            <span className="ml-2 text-xs">{selectedLead?.createdAt?.toLocaleString().split('T')[0]} {selectedLead?.createdAt?.toLocaleString().split('T')[1].split('.')[0]}</span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Updated At:</label>
                            <span className="ml-2 text-xs">{selectedLead?.updatedAt?.toLocaleString().split('T')[0]} {selectedLead?.updatedAt?.toLocaleString().split('T')[1].split('.')[0]}</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                value={selectedLead?.status || ""}
                                onChange={(e) => handleLeadUpdate({ status: e.target.value as Lead["status"] })}
                                className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Processing">Processing</option>
                                <option value="Followup">Followup</option>
                                <option value="CallbackRequested">Callback Requested</option>
                                <option value="SaleMade">Sale Made</option>
                                <option value="DeclinedSale">Declined Sale</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Follow-up At</label>
                            <input
                                type="datetime-local"
                                value={selectedLead?.followupAt?.toString().slice(0, 16) || ""}
                                onChange={(e) => handleLeadUpdate({ followupAt: new Date(e.target.value) })}
                                className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Closing Note</label>
                            <textarea
                                value={selectedLead?.closingNote || ""}
                                onChange={(e) => handleLeadUpdate({ closingNote: e.target.value })}
                                className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Client Details */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Client Details</h2>
                    <div className="space-y-4">
                        {client && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium">Phone</label>
                                    <input
                                        type="text"
                                        value={client.phone || ""}
                                        readOnly
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Business Name</label>
                                    <input
                                        type="text"
                                        value={client.businessName || ""}
                                        onChange={(e) => setClient({ ...client, businessName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Client Name</label>
                                    <input
                                        type="text"
                                        value={client.fullName || ""}
                                        onChange={(e) => setClient({ ...client, fullName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        value={client.email || ""}
                                        onChange={(e) => setClient({ ...client, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Merchant History</label>
                                    <textarea
                                        value={client.merchantHistory || ""}
                                        onChange={(e) => setClient({ ...client, merchantHistory: e.target.value })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Deposit</label>
                                    <input
                                        type="number"
                                        value={client.deposit || ""}
                                        onChange={(e) => setClient({ ...client, deposit: Number(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Looking For</label>
                                    <input
                                        type="number"
                                        value={client.lookingFor || ""}
                                        onChange={(e) => setClient({ ...client, lookingFor: Number(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Credit Score</label>
                                    <input
                                        type="number"
                                        value={client.creditScore || ""}
                                        onChange={(e) => setClient({ ...client, creditScore: Number(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Existing Loan</label>
                                    <input
                                        type="number"
                                        value={client.existingLoan || ""}
                                        onChange={(e) => setClient({ ...client, existingLoan: Number(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Note</label>
                                    <textarea
                                        value={client.note || ""}
                                        onChange={(e) => setClient({ ...client, note: e.target.value })}
                                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={handleClientUpdate}
                                    className="w-full bg-indigo-600 text-white py-2 rounded mt-4"
                                >
                                    Update Client
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Comments */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Comments</h2>
                    <div className="space-y-4">
                        {selectedLead?.comments?.map((comment) => (
                            <div key={comment._id} className="flex items-start space-x-2">
                                <p className="flex-1">{comment.comment}</p>
                                <button
                                    onClick={() => setEditingComment({ id: comment._id!, text: comment.comment! })}
                                    className="text-indigo-600"
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                        {editingComment && (
                            <div>
                                <textarea
                                    value={editingComment.text}
                                    onChange={(e) => setEditingComment({ ...editingComment, text: e.target.value })}
                                    className="w-full mt-1 p-2 border rounded"
                                />
                                <button
                                    onClick={handleUpdateComment}
                                    className="w-full bg-indigo-600 text-white py-2 rounded mt-4"
                                >
                                    Update Comment
                                </button>
                            </div>
                        )}
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a new comment"
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddComment}
                            className="w-full bg-indigo-600 text-white py-2 rounded mt-4"
                        >
                            Add Comment
                        </button>
                    </div>
                </div>

                {/* Current Owner */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Current Owner</h2>
                    <div className="space-y-4">
                        <p>Current Owner: {selectedLead?.currentOwner?.username || "N/A"}</p>
                        <input
                            type="email"
                            value={currentOwnerEmail}
                            onChange={(e) => setCurrentOwnerEmail(e.target.value)}
                            placeholder="Enter new owner's email"
                            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleUpdateCurrentOwner}
                            className="w-full bg-indigo-600 text-white py-2 rounded mt-4"
                        >
                            Update Current Owner
                        </button>
                    </div>
                </div>
            </div> :
            <p>No lead is selected</p>}
        </div>
    );
};

export default ManageLead;