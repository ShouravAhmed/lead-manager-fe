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

export const login = async (data: { username: string; password: string }) => {
    const response = await API.post('/api/auth/login', data);
    const { user, accessToken, refreshToken } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
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

export const logout = () => {
    API.post('/api/auth/logout');
    localStorage.clear();
};

export const refreshToken = async (refreshToken: string) => {
    const response = await API.post('/api/auth/refresh-token', { refreshToken });
    return response.data;
};

export const getUserDetails = async () => {
    const response = await API.get('/api/auth/user');
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
};

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('accessToken');
    console.log("IsAuthenticated: ", !!token);
    return !!token;
};
