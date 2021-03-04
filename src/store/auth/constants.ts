import { User, ErrorModel } from "./types";

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const CHECK_AUTH = 'CHECK_AUTH';
export const LOGOUT = 'LOGOUT';
export const RESET_ERROR = 'RESET_ERROR';
export const CREATE_TOAST = 'CREATE_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const CREATE_ERROR = 'CREATE_ERROR';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

interface Login {
    type: typeof LOGIN,
    payload: {
        username: string,
        password: string
    }
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS,
    payload: User
}

interface Logout {
    type: typeof LOGOUT
}

interface Register {
    type: typeof REGISTER,
    payload: {
        username: string,
        password: string
    }
}

interface RegisterSuccess {
    type: typeof REGISTER_SUCCESS,
    payload: User
}

interface CheckAuth {
    type: typeof CHECK_AUTH,
    payload: string
}

interface LoginFailed {
    type: typeof LOGIN_FAILED,
    payload: ErrorModel
}

interface RegisterFailed {
    type: typeof REGISTER_FAILED,
    payload: ErrorModel
}

interface ResetError {
    type: typeof RESET_ERROR
}

interface CreateToast {
    type: typeof CREATE_TOAST,
    payload: {
        message: string,
        type: string
    }
}

interface HideToast {
    type: typeof HIDE_TOAST,
    payload: string
}

interface CreateError {
    type: typeof CREATE_ERROR,
    payload: ErrorModel
}

interface UpdateUserInfo {
    type: typeof UPDATE_USER_INFO,
    payload: User
}

export type authActionTypes = Login
    | LoginSuccess
    | Logout
    | CreateToast
    | CreateError
    | HideToast
    | ResetError
    | CheckAuth
    | LoginFailed
    | UpdateUserInfo
    | RegisterFailed
    | Register
    | RegisterSuccess;