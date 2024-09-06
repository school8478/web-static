export interface User {
    id: string;
    email: string;
    role?: string; // role을 선택적 속성으로 변경
    // 다른 필요한 속성들...
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