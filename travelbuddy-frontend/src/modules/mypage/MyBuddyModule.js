import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_BUDDY = 'GET_BUDDY';
export const PUT_BUDDY = 'PUT_BUDDY';
export const DELETE_BUDDY = 'DELETE_BUDDY';

export const getBuddy = createAction(GET_BUDDY);
export const putBuddy = createAction(PUT_BUDDY);
export const deleteBuddy = createAction(DELETE_BUDDY);

/* 리듀서 */
const myBuddyReducer = handleActions(
    {
        [GET_BUDDY]: (state, action) => ({
            ...state,
            buddy: action.payload,
        }),
        [PUT_BUDDY]: (state, action) => ({
            ...state,
            putResult: action.payload,
        }),
        [DELETE_BUDDY]: (state, action) => ({
            ...state,
            deleteResult: action.payload,
        }),
    },
    initialState
);
export default myBuddyReducer;