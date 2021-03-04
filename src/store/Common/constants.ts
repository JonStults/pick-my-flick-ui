export const SET_WAITING = 'SET_WAITING';

interface SetWaiting {
    type: typeof SET_WAITING,
    payload: boolean
}

export type commonActionTypes = SetWaiting;