import { takeLatest } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/authAPI';

const SIGNIN = 'user/SIGNIN';
const [SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_FAILURE] = createRequestActionTypes(
    'user/SIGNOUT'
);

export const signin = createAction(SIGNIN);
export const signout = createAction(SIGNOUT);

const signoutSaga = createRequestSaga(SIGNOUT, authAPI.logout);

export function* userSaga() {
    yield takeLatest(SIGNOUT, signoutSaga);
}

const initialState = {
    user: null
};

export default handleActions(
    {
        [SIGNIN]: (state, { payload: user }) => ({
            ...state,
            user
        }),
        [SIGNOUT_SUCCESS]: (state, action) => ({
            ...state,
            user: null
        }),
        [SIGNOUT_FAILURE]: (state, action) => ({
            ...state,
            user: null
        }),
    },
    initialState,
);