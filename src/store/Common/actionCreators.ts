import * as constants from './constants';

export function setWaiting(bool: boolean): constants.commonActionTypes {
    return {
        type: constants.SET_WAITING,
        payload: bool
    }
}