import { call, put, takeEvery, all } from 'redux-saga/effects';
import { fetchGenres, fetchMovies, fetchRandomMovie, postMovie } from '../../api/movies/GetMovies';
import { getMoviesSuccess, getRandomMovieSuccess } from './actionCreators';
import { ENTER_MOVIE, GET_MOVIES, GET_RANDOM_MOVIE } from './constants';

export function* getMoviesSaga() {
    try {
        const response = yield call(fetchGenres);
        // const movies = yield call(fetchMovies);
        yield put(getMoviesSuccess(response))
    } catch (e) {
        console.log(e)
    }
}

export function* enterMovieSaga(action: any) {
    try {
        yield call(postMovie, action.payload.title, action.payload.genre);
    } catch (e) {
        console.log(e)
    }
}

export function* getRandomMovieSaga(action: any) {
    try {
        const response = yield call(fetchRandomMovie, action.payload);
        yield put(getRandomMovieSuccess(response))
    } catch (e) {
        console.log(e)
    }
}

function* watchGetMoviesSaga() {
    yield takeEvery(GET_MOVIES, getMoviesSaga);
    yield takeEvery(GET_RANDOM_MOVIE, getRandomMovieSaga);
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