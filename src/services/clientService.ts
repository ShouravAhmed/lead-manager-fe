import API from "../utils/authInterceptor";
import { Client } from "../types";

export const createClient = async (data: Client) => {
    const response = await API.post('/api/client', data);
    return response.data;
};

export const updateClient = async (id: string, data: Client) => {
    const response = await API.put(`/api/client/${id}`, data);
    return response.data.client;
};

export const getClientsByTeamAndPhone = async (team: string, phone?: string) => {
    const response = await API.get('/api/client/', {
        params: {
            team,
            ...(phone && { phone }),
        },
    });
    return response.data.clients;
};

export const addCommentToClient = async (id: string, data: { comment: string }) => {
    const response = await API.post(`/api/client/${id}/comment`, data);
    return response.data;
};

export const updateClientComment = async (id: string, commentId: string, data: { comment: string }) => {
    const response = await API.post(`/api/client/${id}/comment/${commentId}`, data);
    return response.data;
};
