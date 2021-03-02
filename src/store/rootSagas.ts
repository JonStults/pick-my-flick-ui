import { all } from 'redux-saga/effects';
import watchAllMovies from './movies/sagas';

function* rootSaga() {
    yield all([
        watchAllMovies()
    ])
}

export default rootSaga;