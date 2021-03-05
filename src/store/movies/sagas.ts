import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { fetchGenres, fetchRandomMovie, postMovie, postUserFlick } from '../../api/movies/GetMovies';
import { RootState } from '../rootState';
import { enterMovieSuccess, getMoviesSuccess, getRandomMovieError, getRandomMovieSuccess, resetMessage } from './actionCreators';
import { CREATE_USER_FLICK, ENTER_MOVIE, GET_MOVIES, GET_RANDOM_MOVIE } from './constants';

const selectUserId = (state: RootState) => state.AuthState.user.id;

export function* getMoviesSaga() {
    try {
        const response = yield call(fetchGenres);
        yield put(getMoviesSuccess(response))
    } catch (e) {
        console.log(e)
    }
}

export function* enterMovieSaga(action: any) {
    try {
        const userId = yield select(selectUserId);
        const response = yield call(postMovie, action.payload.title, action.payload.genre, userId);
        if (!response.isError) yield put(enterMovieSuccess({message: response.message, ok: response.ok, metaData: response.metaData}))
    } catch (e) {
        console.log(e)
    }
}

export function* getRandomMovieSaga(action: any) {
    try {
        const userId = yield select(selectUserId);
        const response = yield call(fetchRandomMovie, action.payload, userId);
        if (!response.isError) {
            yield put(getRandomMovieSuccess(response))
        } else {
            yield put(getRandomMovieError(response))
        }
    } catch (e) {
        console.log(e)
    }
}

export function* createUserFlickSaga(action: any) {
    try {
        const response = yield call(postUserFlick, action.payload.userId, action.payload.movieId);
        yield put(resetMessage())
    } catch (e) {
        console.log(e)
    }
}

function* watchGetMoviesSaga() {
    yield takeEvery(GET_MOVIES, getMoviesSaga);
    yield takeEvery(GET_RANDOM_MOVIE, getRandomMovieSaga);
    yield takeEvery(CREATE_USER_FLICK, createUserFlickSaga);
}

function* watchEnterMovieSaga() {
    yield takeEvery(ENTER_MOVIE, enterMovieSaga)
}

export default function* watchAllMovies() {
    yield all([
        watchGetMoviesSaga(),
        watchEnterMovieSaga()
    ])
}