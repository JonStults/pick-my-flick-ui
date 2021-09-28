import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { fetchGenres, fetchRandomMovie, postMovie, postUserFlick } from '../../api/movies/GetMovies';
import { searchMovies } from '../../api/movies/SearchMovies';
import { updatedWatched } from '../../api/movies/UpdateWatched';
import { RootState } from '../rootState';
import { enterMovieSuccess, getMoviesSuccess, getRandomMovieError, getRandomMovieSuccess, resetMessage, resetSearch, searchMoviesSuccess, updateMovieWatchedSuccess } from './actionCreators';
import { CREATE_USER_FLICK, ENTER_MOVIE, GET_MOVIES, GET_RANDOM_MOVIE, SEARCH_MOVIES, UPDATE_MOVIE_WATCHED } from './constants';

const selectUserId = (state: RootState) => state.AuthState.user.id;

export function* getMoviesSaga() {
    try {
        const response = yield call(fetchGenres);
        yield put(getMoviesSuccess(response))
    } catch (e) {
        console.log(e)
    }
}

export function* enterMovieSaga(action: any): any {
    try {
        const userId = yield select(selectUserId);
        const response = yield call(postMovie, action.payload, userId);
        if (!response.isError) yield put(enterMovieSuccess({ message: response.message, ok: response.ok, metaData: response.metaData, searchResults: response.movie_list, total_pages: response.total_pages }))
    } catch (e) {
        console.log(e)
    }
}

export function* searchMoviesSaga(action: any): any {
    try {
        const response = yield call(searchMovies, action.payload.title, action.payload.page);
        if (!response.isError) {
            if (action.payload.page === 1) yield put(resetSearch());
            yield put(searchMoviesSuccess({ message: response.message, ok: response.ok, metaData: response.metaData, searchResults: response.movie_list, total_pages: response.total_pages }));
        }
    } catch (e) {
        console.log(e)
    }
}

export function* getRandomMovieSaga(action: any): any {
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

export function* createUserFlickSaga(action: any): any {
    try {
        const response = yield call(postUserFlick, action.payload.userId, action.payload.movieId);
        yield put(resetMessage())
    } catch (e) {
        console.log(e)
    }
}

export function* updatedWatchedSaga(action: any): any {
    try {
        const userId = yield select(selectUserId);
        const response = yield call(updatedWatched, userId, action.payload.movieId, action.payload.watched);
        if (!response.isError) {
            yield put(updateMovieWatchedSuccess(action.payload.movieId, action.payload.watched))
        }
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

function* watchSearchMoviesSaga() {
    yield takeEvery(SEARCH_MOVIES, searchMoviesSaga);
}

function* watchUpdatedWatchedSaga() {
    yield takeEvery(UPDATE_MOVIE_WATCHED, updatedWatchedSaga);
}

export default function* watchAllMovies() {
    yield all([
        watchGetMoviesSaga(),
        watchEnterMovieSaga(),
        watchSearchMoviesSaga(),
        watchUpdatedWatchedSaga()
    ])
}