import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as calAPI from '../lib/api/calAPI';

const [GET_TAGS, GET_TAGS_SUCCESS, GET_TAGS_FAILURE] = createRequestActionTypes(
    'cal/GET_TAGS'
);

export const getTags = createAction(GET_TAGS, ({ year, month}) => ({
    year,
    month
}));

const getTagsSaga = createRequestSaga(GET_TAGS, calAPI.getTags);

export function* calSaga() {
    yield takeLatest(GET_TAGS, getTagsSaga);
}

const initialState = {
    tags: null
};

const cal = handleActions(
    {
        [GET_TAGS_SUCCESS]: (state, { payload: tags }) => ({
            ...state,
            tags
        }),
        [GET_TAGS_FAILURE]: (state, { payload: tags }) => ({
            ...state,
            tags
        }),
    },
    initialState
);

export default cal;