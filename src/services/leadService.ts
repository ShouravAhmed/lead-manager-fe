import API from "../utils/authInterceptor";
import { Lead } from "../types";

export const getLeadById = async (id: string) => {
    const response = await API.get(`/api/lead/${id}`);
    return response.data;
};

export const getLeadsByTeam = async (
    teamId: string,
    params?: {
        limit?: number;
        page?: number;
        clientPhone?: string;
        fromDate?: string;
        toDate?: string;
        status?: string;
        currentOwner?: boolean;
        subOwner?: boolean;
        createdBy?: boolean;
    }
) => {
    const response = await API.get(`/api/lead/team/${teamId}`, {
        params,
    });
    return response.data.leads;
};

export const createLead = async (data: { team: string; client: string }) => {
    const response = await API.post('/api/lead', data);
    return response.data;
};

export const updateLead = async (
    id: string,
    data: {
        status?: string;
        followupAt?: string;
        closingNote?: string;
    }
) => {
    const response = await API.put(`/api/lead/${id}`, data);
    return response.data;
};

export const addCommentToLead = async (id: string, data: { comment: string }) => {
    const response = await API.post(`/api/lead/${id}/comment`, data);
    return response.data;
};

export const updateLeadCurrentOwner = async (id: string, data: { email: string }) => {
    const response = await API.post(`/api/lead/${id}/current-owner`, data);
    return response.data;
};