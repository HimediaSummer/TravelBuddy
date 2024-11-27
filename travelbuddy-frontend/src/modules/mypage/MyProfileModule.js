import { createAction, handleActions } from 'redux-actions';

const initialState = {
    profile: [],
    updateResult: null
};

export const GET_PROFILE = 'GET_PROFILE';
export const PUT_PROFILE = 'PUT_PROFILE';

export const getProfile = createAction(GET_PROFILE);
export const putProfile = createAction(PUT_PROFILE);

/* 리듀서 */
const myProfileReducer = handleActions(
    {
        [GET_PROFILE]: (state, action) => ({
            ...state,
            profile: action.payload,
        }),
        [PUT_PROFILE]: (state, action) => ({
            ...state,
            updateResult: action.payload,
        }),
    },
    initialState
);
export default myProfileReducer;