import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const [VALIDATE, VALIDATE_SUCCESS, VALIDATE_FAILURE] = createRequestActionTypes(
    'user/VALIDATE',
);

export const validate = createAction(VALIDATE);

const validateSaga = createRequestSaga(VALIDATE, authAPI.validate);
export function* userSaga() {
    yield takeLatest(VALIDATE, validateSaga);
}

const initialState = {
    user: null,
    validateError: null,
};

export default handleActions(
    {
        [VALIDATE_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user,
            validateError: null,
        }),
        [VALIDATE_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: null,
            validateError: error,
        }),
    },
    initialState,
);