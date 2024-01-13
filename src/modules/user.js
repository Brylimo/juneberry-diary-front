import { createAction, handleActions } from 'redux-actions';

const SIGNIN = 'user/SIGNIN';
const SIGNOUT = 'user/SIGNOUT';

export const signin = createAction(SIGNIN);
export const signout = createAction(SIGNOUT);

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
        })
    },
    initialState,
);