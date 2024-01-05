import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import cal, { calSaga } from './cal';

const rootReducer = combineReducers({
    loading, auth, user, cal
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), calSaga()]);
}

export default rootReducer;