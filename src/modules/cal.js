import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as calAPI from '../lib/api/calAPI';

const [GET_TAGS_BY_MONTH, GET_TAGS_BY_MONTH_SUCCESS, GET_TAGS_BY_MONTH_FAILURE] = createRequestActionTypes(
    'cal/GET_TAGS_BY_MONTH'
);

export const getTagsByMonth = createAction(GET_TAGS_BY_MONTH, ({ year, month }) => {
    return ({
    year,
    month    
})});

const getTagsByMonthSaga = createRequestSaga(GET_TAGS_BY_MONTH, calAPI.getTagsByMonth);

export function* calSaga() {
    yield takeLatest(GET_TAGS_BY_MONTH, getTagsByMonthSaga);
}

const initialState = {
    tagList: null
};

const cal = handleActions(
    {
        [GET_TAGS_BY_MONTH_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            tagList: data.data
        }),
        [GET_TAGS_BY_MONTH_FAILURE]: (state, { payload }) => ({
            ...state
        }),
    },
    initialState
);

export default cal;