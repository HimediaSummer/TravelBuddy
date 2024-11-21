import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_BUDDY = 'GET_BUDDY';

export const getBuddy = createAction(GET_BUDDY);

/* 리듀서 */
const myBuddyReducer = handleActions(
    {
        [GET_BUDDY]: (state, action) => ({
            ...state,
            buddy: action.payload,
        }),
    },
    initialState
);
export default myBuddyReducer;