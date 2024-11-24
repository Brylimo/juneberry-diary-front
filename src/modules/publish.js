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
    isPublic: true,
    title: '',
    description: '',
    mrkdown: '',
    html: '',
    postId: '',
    thumbnailPath: null,
    updateDt: null,
    postTags: [],
}

const publish = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [STORE_POST]: (state, { payload: {id, title, description, mrkdown, postTags, updateDt, isTemp, isPublic, thumbnailPath }}) => ({
            ...state,
            postId: id,
            title: title,
            description: description || '',
            mrkdown: mrkdown,
            postTags: postTags,
            updateDt: updateDt,
            isTemp: isTemp,
            isPublic: isPublic,
            thumbnailPath: thumbnailPath
        }),
        [CHANGE_FIELD]: (state, { payload: {key, value} }) => ({
            ...state,
            [key]: value,
        })
    },
    initialState
);

export default publish;