import * as constants from './constants';
import { User, ErrorModel } from './types';

export function login(username: string, password: string): constants.authActionTypes {
    return {
        type: constants.LOGIN,
        payload: {
            username: username,
            password: password
        }
    }
}

export function loginSuccess(data: User): constants.authActionTypes {
    return {
        type: constants.LOGIN_SUCCESS,
        payload: data
    }
}

export function register(username: string, password: string): constants.authActionTypes {
    return {
        type: constants.REGISTER,
        payload: {
            username: username,
            password: password
        }
    }
}

export function registerSuccess(data: User): constants.authActionTypes {
    return {
        type: constants.REGISTER_SUCCESS,
        payload: data
    }
}

export function checkAuth(guid: string): constants.authActionTypes {
    return {
        type: constants.CHECK_AUTH,
        payload: guid
    }
}

export function logout(): constants.authActionTypes {
    return {
        type: constants.LOGOUT
    }
}

export function loginFailed(data: ErrorModel): constants.authActionTypes {
    return {
        type: constants.LOGIN_FAILED,
        payload: data
    }
}

export function registerFailed(data: ErrorModel): constants.authActionTypes {
    return {
        type: constants.REGISTER_FAILED,
        payload: data
    }
}

export function resetError(): constants.authActionTypes {
    return {
        type: constants.RESET_ERROR
    }
}

export function createToast (message: string, type: string): constants.authActionTypes {
    return {
      type: constants.CREATE_TOAST,
      payload: {
        message: message,
        type: type
      }
    }
  }
  
  export function hideToast (type: string): constants.authActionTypes {
    return {
      type: constants.HIDE_TOAST,
      payload: type
    }
  }

  export function createError(error: ErrorModel): constants.authActionTypes {
      return {
          type: constants.CREATE_ERROR,
          payload: error
      }
  }

  export function udpateUserInfo(data: User): constants.authActionTypes {
    return {
        type: constants.UPDATE_USER_INFO,
        payload: data
    }
}