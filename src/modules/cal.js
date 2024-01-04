import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as calAPI from '../lib/api/calAPI';

const initialState = {

};

const cal = handleActions(
    {

    },
    initialState
);

export default cal;