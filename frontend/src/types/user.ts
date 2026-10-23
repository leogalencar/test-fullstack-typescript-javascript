export interface User {
    id: number;
    name: string;
    email: string;
    role?: string | null;
    createdAt: string;
}

export interface UserFormData {
    name: string;
    email: string;
    role?: string;
}
