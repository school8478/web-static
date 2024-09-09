export interface User {
    id: string;
    email: string;
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