import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';

const STORE_EVENTS = 'cal/STORE_EVENTS';
const CHANGE_TAGS = 'cal/CHANGE_TAGS';

export const storeEvents = createAction(STORE_EVENTS);
export const changeTags = createAction(
    CHANGE_TAGS,
    ({ key, value }) => ({
        key,
        value
    })
);

const initialState = {
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
            })
    },
    initialState
);

export default cal;