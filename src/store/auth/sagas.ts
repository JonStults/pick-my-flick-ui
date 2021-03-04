import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LOGIN, REGISTER, CHECK_AUTH, LOGOUT } from './constants';
import { fetchLogin, fetchAuth } from '../../api/auth/Login';
import { fetchRegister } from '../../api/auth/Register';
import jwt from 'jsonwebtoken';
import { loginSuccess, registerSuccess, loginFailed, registerFailed } from './actionCreators';
import { setWaiting } from '../Common/actionCreators';
import { ErrorModel } from './types';
import { TOKEN, ROUTES } from '../Constants';
import {history} from '../../index';

export function* loginSaga(action: any) {
    try {
        yield put(setWaiting(true));
        const response = yield call(fetchLogin, action.payload.username, action.payload.password);
        if (!response.isError) {
            let decoded = jwt.decode(response.token, { complete: true, json: true }) as { [key: string]: any };
            localStorage.setItem(TOKEN, response.token);
            yield put(loginSuccess({...decoded.payload, isAuthenticated: true}));
        } else {
            let errorData: ErrorModel = {isError: true, message: response.data};
            console.log(response)
            yield put(loginFailed(errorData));
        }
        yield put(setWaiting(false));
    } catch (e) {
        console.log(e)
    }
}

export function* registerSaga(action: any) {
    try {
        yield put(setWaiting(true));
        const response = yield call(fetchRegister, action.payload.username, action.payload.password);
        if (!response.isError) {
            let decoded = jwt.decode(response.token, { complete: true, json: true }) as { [key: string]: any };
            localStorage.setItem(TOKEN, response.token);
            yield put(registerSuccess({...decoded.payload, isAuthenticated: true}))
        } else {
            let errorData: ErrorModel = {isError: true, message: response.data};
            yield put(registerFailed(errorData));
        }
        yield put(setWaiting(false));
    } catch (e) {
        console.log(e)
    }
}

export function* checkAuthSaga(action: any) {
    try {
        yield put(setWaiting(true));
        const response = yield call(fetchAuth, action.payload);
        if (!response.isError) {
            // localStorage.setItem(_FIVE04_AUTH, response.userGuid);
            // yield put(loginSuccess({id: response.id, userGuid: response.userGuid}))
        }
        yield put(setWaiting(false));
    } catch (e) {
        console.log(e)
    }
}

export function* logoutSaga() {
    try {
        history.push(ROUTES.LOGIN);
        yield localStorage.removeItem('fb_auth_token')
    } catch (e) {
        console.log(e)
    }
}

function* watchLoginSaga() {
    yield takeEvery(LOGIN, loginSaga)
}

function* watchLogoutSaga() {
    yield takeEvery(LOGOUT, logoutSaga)
}

function* watchRegisterSaga() {
    yield takeEvery(REGISTER, registerSaga)
}

function* watchCheckAuthSaga() {
    yield takeEvery(CHECK_AUTH, checkAuthSaga)
}

export default function* watchAllAuth() {
    yield all([
        watchLoginSaga(),
        watchRegisterSaga(),
        watchCheckAuthSaga(),
        watchLogoutSaga()
    ])
}