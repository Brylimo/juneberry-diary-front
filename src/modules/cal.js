import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';

const STORE_TAGS = 'cal/STORE_TAGS';
const STORE_EVENTS = 'cal/STORE_EVENTS';
const STORE_EMOJIS = 'cal/STORE_EMOJIS';
const CHANGE_EVENT_TAGS = 'cal/CHANGE_EVENT_TAGS';
const CHANGE_EMOJI = 'cal/CHANGE_EMOJI';
const TOGGLE_TODOACTIVE = 'cal/TOGGLE_TODOACTIVE';
const INITIALIZE_EVENTHASH = 'cal/INITIALIZE_EVENTHASH';
const INITIALIZE_EMOJIHASH = 'cal/INITIALIZE_EMOJIHASH';
const INITIALIZE_TAGHASH = 'cal/INITIALIZE_TAGHASH';

export const storeTags = createAction(STORE_TAGS);
export const storeEvents = createAction(STORE_EVENTS);
export const storeEmojis = createAction(STORE_EMOJIS);
export const changeEventTags = createAction(
    CHANGE_EVENT_TAGS,
    ({ key, value }) => ({
        key,
        value
    })
);
export const changeEmoji = createAction(
    CHANGE_EMOJI,
    ({ key, value }) => ({
        key,
        value
    })
);
export const toggleTodoActive = createAction(TOGGLE_TODOACTIVE);    
export const initializeEventHash = createAction(INITIALIZE_EVENTHASH);
export const initializeEmojiHash = createAction(INITIALIZE_EMOJIHASH);
export const initializeTagHash = createAction(INITIALIZE_TAGHASH);

const initialState = {
    todoActive: false,
    tagHash: {},
    eventHash: {},
    emojiHash: {}
}

const cal = handleActions(
    {
        [STORE_TAGS]: (state, { payload: {tagHash } }) => ({
            ...state,
            tagHash: tagHash
        }),
        [STORE_EVENTS]: (state, { payload: { eventHash } }) => ({
            ...state,
            eventHash: eventHash
        }),
        [STORE_EMOJIS]: (state, { payload: { emojiHash } }) => ({
            ...state,
            emojiHash: emojiHash
        }),
        [CHANGE_EVENT_TAGS]: (state, { payload: { key, value} }) =>
            produce(state, draft => {
                draft.eventHash[key] = value;
            }),
        [CHANGE_EMOJI]: (state, { payload: { key, value} }) =>
            produce(state, draft => {
                draft.emojiHash[key] = value;
            }),
        [TOGGLE_TODOACTIVE]: (state) => ({
            ...state,
            todoActive: !state.todoActive
        }),
        [INITIALIZE_EVENTHASH]: (state) => ({
            ...state,
            eventHash: initialState.eventHash
        }),
        [INITIALIZE_EMOJIHASH]: (state) => ({
            ...state,
            emojiHash: initialState.emojiHash
        }),
        [INITIALIZE_TAGHASH]: (state) => ({
            ...state,
            tagHash: initialState.tagHash
        })
    },
    initialState
);

export default cal;