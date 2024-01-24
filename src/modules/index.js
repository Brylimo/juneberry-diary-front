import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import cal from './cal';
import todo from './todo';

const rootReducer = combineReducers({
    auth, user, cal, todo
});

export default rootReducer;