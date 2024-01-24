import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';

const STORE_TODO = 'cal/STORE_TODO';

export const storeTodo = createAction(STORE_TODO);

const initialState = {
    todoList: [],
    maxIdx: 0
}

const todo = handleActions(
    {
        [STORE_TODO]: (state, { payload: { todo } }) => 
            produce(state, draft => {
                draft.todoList.push(todo);
            }),
    }, 
    initialState
);

export default todo;