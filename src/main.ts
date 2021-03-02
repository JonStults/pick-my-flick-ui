import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/rootSagas';
import { RootState } from './store/rootState';
import { moviesReducer } from './store/movies/reducers';
import logger from 'redux-logger';

const appReducer = combineReducers<RootState>({
    MoviesState: moviesReducer
});

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action)
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store;



