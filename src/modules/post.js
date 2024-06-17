import { createAction, handleActions } from "redux-actions";

const INITIALIZE = 'post/INITIALIZE';
const CHANGE_POST_FIELD = 'post/CHANGE_POST_FIELD';

export const initialize = createAction(INITIALIZE);
export const changePostField = createAction(CHANGE_POST_FIELD, ({ key, value }) => ({
    key,
    value
}))

const initialState = {
    tempCnt: 0
}

const post = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_POST_FIELD]: (state, { payload: {key, value}}) => ({
            ...state,
            [key]: value,
        })
    },
    initialState
)

export default post;