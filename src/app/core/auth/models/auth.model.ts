export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    firstName : string;
    lastName : string;
    isActive:boolean;
    email: string;
    token: string;
    expiresAt: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: number;
    firstName: string;
    lastName: string;
}


export interface User {
    email: string;
    firstName: string;
    lastName: string;
    isActive:boolean;
}