import { createAction, handleActions } from "redux-actions";

const INITIALIZE = 'publish/INITIALIZE';
const CHANGE_FIELD = 'publish/CHANGE_FIELD';
const TOGGLE_PREVIEWACTIVE = 'publish/TOGGLE_PREVIEWACTIVE';
const STORE_POST = 'publish/STORE_POST';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value
}));
export const togglePreviewActive = createAction(TOGGLE_PREVIEWACTIVE);
export const storePost = createAction(STORE_POST);

const initialState = {
    previewActive: false,
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
        }),
        [TOGGLE_PREVIEWACTIVE]: (state) => ({
            ...state,
            previewActive: !state.previewActive
        })
    },
    initialState
);

export default publish;