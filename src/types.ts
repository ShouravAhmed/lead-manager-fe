export interface User {
    _id?: string;
    phone?: string;
    email?: string;
    username?: string;
    fullName?: string;
    title?: string;
    bio?: string;
    password?: string;
    profilePicture?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Team {
    _id?: string;
    title?: string;
    description?: string;
    members?: User[];
    owner?: string;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Client {
    _id?: string;
    team?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    businessName?: string;
    merchantHistory?: string;
    deposit?: number;
    lookingFor?: number;
    creditScore?: number;
    existingLoan?: number;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LeadComment {
    _id?: string;
    user?: string;
    comment?: string;
    createdAt?: Date;
}

export interface Lead {
    _id?: string;
    createdBy?: User;
    team?: string;
    client?: Client;
    currentOwner?: User;
    subOwners?: User[];
    status?: 'Processing' | 'Followup' | 'CallbackRequested' | 'SaleMade' | 'DeclinedSale';
    followupAt?: Date;
    closingNote?: string;
    comments?: LeadComment[];
    createdAt?: Date;
    updatedAt?: Date;
}