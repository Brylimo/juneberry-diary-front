import { combineReducers } from 'redux';
import loading from './loading';
import auth from './auth';

const rootReducer = combineReducers({
    loading, auth
});

export default rootReducer;