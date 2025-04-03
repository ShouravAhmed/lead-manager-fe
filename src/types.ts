export interface User {
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

export interface Team {
    id: string;
    title: string;
    description?: string;
    members: User[];
    owner: User;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}