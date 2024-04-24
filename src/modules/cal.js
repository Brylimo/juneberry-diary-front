import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';

const STORE_EVENTS = 'cal/STORE_EVENTS';
const CHANGE_TAGS = 'cal/CHANGE_TAGS';
const TOGGLE_TODOACTIVE = 'cal/TOGGLE_TODOACTIVE';
const INITIALIZE_EVENTHASH = 'cal/INITIALIZE_EVENTHASH';

export const storeEvents = createAction(STORE_EVENTS);
export const changeTags = createAction(
    CHANGE_TAGS,
    ({ key, value }) => ({
        key,
        value
    })
);
export const toggleTodoActive = createAction(TOGGLE_TODOACTIVE);
export const initializeEventHash = createAction(INITIALIZE_EVENTHASH);

const initialState = {
    todoActive: false,
    eventHash: {}
}

const cal = handleActions(
    {
        [STORE_EVENTS]: (state, { payload: { eventHash } }) => ({
            ...state,
            eventHash: eventHash
        }),
        [CHANGE_TAGS]: (state, { payload: { key, value} }) =>
            produce(state, draft => {
                draft.eventHash[key] = value;
            }),
        [TOGGLE_TODOACTIVE]: (state) => ({
            ...state,
            isTodo: !state.isTodo
        }),
        [INITIALIZE_EVENTHASH]: (state) => ({
            ...state,
            eventHash: initialState.eventHash
        })
    },
    initialState
);

export default cal;