import * as constants from './constants';
import { authActionTypes } from './constants';
import { AuthState, User, ErrorModel } from './types';

const initialState: AuthState = {
    waiting: false,
    user: {
        username: null,
        id: null,
        exp: 0,
        isAuthenticated: null,
      } as User,
    error: {} as ErrorModel,
    toasts: []
}

export function authReducer(state = initialState, action: authActionTypes): AuthState {
    switch (action.type) {
        case constants.LOGIN:
            return {
                ...state,
                waiting: true
            };
        case constants.LOGIN_SUCCESS:
            return {
                ...state,
                waiting: false,
                user: action.payload,
                error: {} as ErrorModel
            };
        case constants.REGISTER:
            return {
                ...state,
                waiting: true
            };
        case constants.REGISTER_SUCCESS:
            return {
                ...state,
                waiting: false,
                user: action.payload,
                error: {} as ErrorModel
            };
        case constants.LOGIN_FAILED:
            return {
                ...state,
                error: action.payload
            };
        case constants.REGISTER_FAILED:
            return {
                ...state,
                error: action.payload
            };
        case constants.LOGOUT:
            return {
                ...state,
                user: {
                    username: null,
                    id: null,
                    exp: 0,
                    isAuthenticated: null
                  } as User
            };
        case constants.CREATE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case constants.RESET_ERROR:
            return {
                ...state,
                error: {} as ErrorModel
            };
        case constants.CREATE_TOAST:
            return {
                ...state,
                toasts: [...state.toasts, action.payload]
            };
        case constants.HIDE_TOAST:
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.type !== action.payload)
            };
        case constants.UPDATE_USER_INFO:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
