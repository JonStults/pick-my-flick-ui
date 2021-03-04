import * as constants from './constants';
import { commonActionTypes } from './constants';
import { CommonState } from './types';

const initialState: CommonState = {
    waiting: false
}

export function commonReducer(state = initialState, action: commonActionTypes): CommonState {
    switch (action.type) {
        case constants.SET_WAITING:
            return {
                ...state,
                waiting: action.payload
            };
        default:
            return state;
    }
}
