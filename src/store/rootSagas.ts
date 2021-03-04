import { all } from 'redux-saga/effects';
import watchAllMovies from './movies/sagas';
import watchAllAuth from './auth/sagas';

function* rootSaga() {
    yield all([
        watchAllMovies(),
        watchAllAuth()
    ])
}

export default rootSaga;