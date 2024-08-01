import { createAction, handleActions } from "redux-actions";

const INITIALIZE = 'publish/INITIALIZE';
const CHANGE_FIELD = 'publish/CHANGE_FIELD';
const STORE_POST = 'publish/STORE_POST';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value
}));
export const storePost = createAction(STORE_POST);

const initialState = {
    saveActive: false,
    submitActive: false,
    tempCntActive: false,
    isTemp: false,
    title: '',
    mrkdown: '',
    html: '',
    postId: '',
    updateDt: null,
    tags: [],
}

const publish = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [STORE_POST]: (state, { payload: {id, title, mrkdown, updateDt, isTemp}}) => ({
            ...state,
            postId: id,
            title: title,
            mrkdown: mrkdown,
            updateDt: updateDt,
            isTemp: isTemp
        }),
        [CHANGE_FIELD]: (state, { payload: {key, value} }) => ({
            ...state,
            [key]: value,
        })
    },
    initialState
);

export default publish;