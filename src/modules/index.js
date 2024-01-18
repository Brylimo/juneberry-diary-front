import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import cal from './cal';

const rootReducer = combineReducers({
    auth, user, cal
});

export default rootReducer;