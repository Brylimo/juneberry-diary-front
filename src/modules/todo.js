import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';

const STORE_TODOS = 'todo/STORE_TODOS';
const STORE_TODAYTXT = 'todo/STORE_TODAYTXT';
const CHANGE_TODO = 'todo/CHANGE_TODO';
const INITIALIZE_TODOHASH = 'todo/INITIALIZE_TODOHASH';

export const storeTodos = createAction(STORE_TODOS);
export const storeTodayTxt = createAction(STORE_TODAYTXT);
export const changeTodo = createAction(
    CHANGE_TODO,
    ({ key, value }) => ({
        key,
        value
    })
);
export const initializeTodoHash = createAction(INITIALIZE_TODOHASH);

const initialState = {
    todayTxt: '',
    todoHash: {}
}

const todo = handleActions(
    {
        [STORE_TODOS]: (state, { payload: { todoHash } }) => ({
            ...state,
            todoHash: todoHash
        }),
        [STORE_TODAYTXT]: (state, { payload: { todayTxt } }) => ({
            ...state,
            todayTxt: todayTxt
        }),
        [CHANGE_TODO]: (state, { payload: { key, value} }) =>
            produce(state, draft => {
                draft.todoHash[key] = value;
            }),    
        [INITIALIZE_TODOHASH]: state => initialState
    }, 
    initialState
);

export default todo;