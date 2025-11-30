import API from "../utils/authInterceptor";
import { Team } from "../types";
import { User } from "../types";

export const getAllTeams = async (): Promise<Team[]> => {
    const response = await API.get('/api/admin/teams');
    return response.data.teams;
};

export const verifyTeam = async (teamId: string): Promise<Team> => {
    const response = await API.put(`/api/admin/teams/${teamId}/verify`);
    return response.data.team;
};

export const unverifyTeam = async (teamId: string): Promise<Team> => {
    const response = await API.put(`/api/admin/teams/${teamId}/unverify`);
    return response.data.team;
};

export const updateTeam = async (teamId: string, data: { title?: string; description?: string }): Promise<Team> => {
    const response = await API.put(`/api/admin/teams/${teamId}`, data);
    return response.data.team;
};

export const deleteTeam = async (teamId: string): Promise<void> => {
    await API.delete(`/api/admin/teams/${teamId}`);
};

export const getAllUsers = async (): Promise<User[]> => {
    const response = await API.get('/api/admin/users');
    return response.data.users;
};

export const updateUserRole = async (userId: string, role: 'user' | 'admin' | 'superAdmin'): Promise<User> => {
    const response = await API.put(`/api/admin/users/${userId}/role`, { role });
    return response.data.user;
};

export const updateUser = async (userId: string, data: Partial<User>): Promise<User> => {
    const response = await API.put(`/api/admin/users/${userId}`, data);
    return response.data.user;
};

export const deleteUser = async (userId: string): Promise<void> => {
    await API.delete(`/api/admin/users/${userId}`);
};

