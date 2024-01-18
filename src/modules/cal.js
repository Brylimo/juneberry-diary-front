import { createAction, handleActions } from "redux-actions";

const STORE_EVENTS = 'cal/STORE_EVENTS';
const INITIALIZE_EVENTS = 'cal/INITIALIZE_EVENTS';

export const storeEvents = createAction(STORE_EVENTS);

const initialState = {
    eventHash: {}
}

const cal = handleActions(
    {
        [STORE_EVENTS]: (state, { payload: { eventHash } }) => ({
            ...state,
            eventHash: eventHash
        })
    },
    initialState
);

export default cal;