import { createAction, handleActions } from 'redux-actions';

const SIGNIN = 'user/SIGNIN';
const SIGNOUT = 'user/SIGNOUT';
const CHANGE_USER_FIELD = 'user/CHANGE_USER_FIELD';

export const signin = createAction(SIGNIN);
export const signout = createAction(SIGNOUT);
export const changeUserField = createAction(CHANGE_USER_FIELD);

const initialState = {
    user: null
};

export default handleActions(
    {
        [SIGNIN]: (state, { payload: user }) => ({
            ...state,
            user
        }),
        [SIGNOUT]: (state, action) => ({
            ...state,
            user: null
        }),
        [CHANGE_USER_FIELD]: (state, { payload: {key, value}}) => ({
            ...state,
            [key]: value
        })
    },
    initialState,
);