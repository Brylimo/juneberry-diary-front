import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';

const STORE_TODOS = 'cal/STORE_TODOS';

export const storeTodos = createAction(STORE_TODOS);

const initialState = {
    todoHash: {},
    maxIdx: 0
}

const todo = handleActions(
    {
        [STORE_TODOS]: (state, { payload: { todoHash } }) => ({
            ...state,
            todoHash: todoHash
        })
    }, 
    initialState
);

export default todo;