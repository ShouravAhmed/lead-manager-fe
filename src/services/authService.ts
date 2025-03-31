// services/authService.ts
export interface LoginResponse {
    token: string;
    refreshToken: string;
    [key: string]: any; // Add additional fields if needed
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Login failed');
    return await res.json();
};

export const refreshToken = async (): Promise<LoginResponse> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    const res = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshtoken: refreshToken }),
    });

    if (!res.ok) throw new Error('Token refresh failed');
    return await res.json();
};