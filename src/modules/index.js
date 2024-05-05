import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import cal from './cal';
import todo from './todo';
import publish from './publish';

const rootReducer = combineReducers({
    auth, user, cal, todo, publish,
});

export default rootReducer;