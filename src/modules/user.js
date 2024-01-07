import { takeLatest } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/authAPI';

const SIGNIN = 'user/SIGNIN';
const [SIGNOUT] = createRequestActionTypes(
    'user/SIGNOUT'
);

export const signin = createAction(SIGNIN);
export const signout = createAction(SIGNOUT);

const initialState = {
    user: null
};

export default handleActions(
    {
        [SIGNIN]: (state, { payload: user }) => ({
            ...state,
            user
        }),
        [SIGNOUT]: (state, action) => ({
            ...state,
            user: null
        })
    },
    initialState,
);