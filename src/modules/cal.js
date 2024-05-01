import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';

const STORE_TAGS = 'cal/STORE_TAGS';
const STORE_EVENTS = 'cal/STORE_EVENTS';
const CHANGE_EVENT_TAGS = 'cal/CHANGE_EVENT_TAGS';
const TOGGLE_TODOACTIVE = 'cal/TOGGLE_TODOACTIVE';
const INITIALIZE_EVENTHASH = 'cal/INITIALIZE_EVENTHASH';

export const storeTags = createAction(STORE_TAGS);
export const storeEvents = createAction(STORE_EVENTS);
export const changeEventTags = createAction(
    CHANGE_EVENT_TAGS,
    ({ key, value }) => ({
        key,
        value
    })
);
export const toggleTodoActive = createAction(TOGGLE_TODOACTIVE);    
export const initializeEventHash = createAction(INITIALIZE_EVENTHASH);

const initialState = {
    todoActive: false,
    tagHash: {},
    eventHash: {}
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
        [CHANGE_EVENT_TAGS]: (state, { payload: { key, value} }) =>
            produce(state, draft => {
                draft.eventHash[key] = value;
            }),
        [TOGGLE_TODOACTIVE]: (state) => ({
            ...state,
            todoActive: !state.todoActive
        }),
        [INITIALIZE_EVENTHASH]: (state) => ({
            ...state,
            eventHash: initialState.eventHash
        })
    },
    initialState
);

export default cal;