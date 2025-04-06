import API from "../utils/authInterceptor";

export const createTeam = async (data: { title: string; description: string }) => {
    const response = await API.post('/api/team', data);
    return response.data;
};

export const getTeamById = async (id: string) => {
    const response = await API.get(`/api/team/${id}`);
    return response.data;
};

export const addMemberToTeam = async (id: string, data: { email: string }) => {
    const response = await API.post(`/api/team/${id}/member`, data);
    return response.data;
};

export const getAllTeams = async () => {
    const response = await API.get('/api/team');
    localStorage.setItem('teams', JSON.stringify(response.data.teams));
    return response.data.teams;
};
