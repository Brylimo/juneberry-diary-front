import { createAction, handleActions } from "redux-actions";

const INITIALIZE = 'publish/INITIALIZE';
const CHANGE_FIELD = 'publish/CHANGE_FIELD';
const TOGGLE_PREVIEWACTIVE = 'publish/TOGGLE_PREVIEWACTIVE';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value
}));
export const togglePreviewActive = createAction(TOGGLE_PREVIEWACTIVE);

const initialState = {
    previewActive: false,
    saveActive: false,
    submitActive: false,
    title: '',
    mrkdown: '',
    html: '',
    postId: '',
    tags: [],
}

const publish = handleActions(
    {
        [INITIALIZE]: state => initialState,
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