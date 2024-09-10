export interface User {
    id: number;
    email: string;
    name?: string;
    password?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export type LoginCredentials = {
    email: string;
    password: string;
};

export type RegisterData = LoginCredentials & {
    name: string;
};

export interface Post {
    id: number;
    category: string;
    title: string;
    content: string;
    createdAt: string;
    author: string;
}