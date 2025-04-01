import API from "../utils/authInterceptor";

export const sendOtp = async (email: string) => {
    const response = await API.post('/api/auth/send-otp', { email });
    return response.data;
};

export const register = async (data: {
    email: string;
    otp: string;
    username: string;
    password: string;
    confirm_password: string;
}) => {
    const response = await API.post('/api/auth/register', data);
    return response.data;
};

export const login = async (data: { email: string; password: string }) => {
    const response = await API.post('/api/auth/login', data);
    return response.data;
};

export const resetPassword = async (data: {
    email: string;
    otp: string;
    old_password: string;
    password: string;
    confirm_password: string;
}) => {
    const response = await API.post('/api/auth/reset-password', data);
    return response.data;
};

export const logout = async () => {
    const response = await API.post('/api/auth/logout');
    return response.data;
};

export const refreshToken = async (refreshtoken: string) => {
    const response = await API.post('/api/auth/refresh-token', { refreshtoken });
    return response.data;
};

export const getUserDetails = async () => {
    const response = await API.get('/api/auth/user');
    return response.data;
};

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('accessToken');
    return !!token;
};
