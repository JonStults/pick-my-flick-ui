export interface AuthState {
    waiting: boolean;
    user: User;
    error: ErrorModel;
    toasts: Toast[];
}

export interface User {
    id: number | null;
    exp: number;
    username: string | null;
    isAuthenticated: boolean | null;
}

export interface ErrorModel {
    isError: boolean;
    message: string;
}

export interface Toast {
    message: string,
    type: string
}