import { createContext, useState, useEffect, ReactNode } from 'react';
import API from '../utils/authInterceptor';

interface User {
    phone: string;
    email: string;
    username: string;
    fullName: string;
    title: string;
    bio: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthContextType {
    user: User | null;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await API.get('/api/auth/user');
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
            } 
            catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    const login = async (credentials: any) => {
        const { data } = await API.post('/auth/login', credentials);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;