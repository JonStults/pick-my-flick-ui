import {MoviesState} from './movies/types';
import {AuthState} from './auth/types';
import {CommonState} from './Common/types';

export interface RootState {
    MoviesState: MoviesState
    AuthState: AuthState;
    CommonState: CommonState;
}