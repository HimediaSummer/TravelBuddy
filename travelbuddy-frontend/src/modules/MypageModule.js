import { createAction, handleActions } from 'redux-actions';

const initialState = {
    profile: {},
    buddy: [],
    matchDetails: [],
    updateResult: null,
    deleteResult: null,
    schedule: {
        data: [], 
        pageInfo: { total: 0 }, 
    },
};

export const GET_PROFILE = 'GET_PROFILE';
export const PUT_PROFILE = 'PUT_PROFILE';

export const GET_SCHEDULE = 'GET_SCHEDULE';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const POST_SCHEDULE = 'POST_SCHEDULE';

export const GET_MYBUDDY = 'GET_MYBUDDY';
export const PUT_MYBUDDY = 'PUT_MYBUDDY';
export const DELETE_MYBUDDY = 'DELETE_MYBUDDY';

export const GET_MY_MATCH = 'GET_MY_MATCH';
export const DELETE_MY_MATCH = 'DELETE_MY_MATCH';

export const getProfile = createAction(GET_PROFILE);
export const putProfile = createAction(PUT_PROFILE);

export const getSchedule = createAction(GET_SCHEDULE);
export const deleteSchedule = createAction(DELETE_SCHEDULE);
export const postSchedule = createAction(POST_SCHEDULE);

export const getMyBuddy = createAction(GET_MYBUDDY);
export const putMyBuddy = createAction(PUT_MYBUDDY);
export const deleteMyBuddy = createAction(DELETE_MYBUDDY);

export const getMyMatch = createAction(GET_MY_MATCH);
export const deleteMyMatch = createAction(DELETE_MY_MATCH);

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

/* 리듀서 */
const myScheduleReducer = handleActions(
    {
        [GET_SCHEDULE]: (state, action) => ({
            ...state,
            schedule: action.payload,
        }),
        [DELETE_SCHEDULE]: (state, action) => ({
            ...state,
            deleteResult: action.payload,
        }),
        [POST_SCHEDULE]: (state, action) => ({
            ...state,
            postResult: action.payload,
        }),
    },
    initialState
);

const myBuddyReducer = handleActions(
    {
        [GET_MYBUDDY]: (state, action) => ({
            ...state,
            buddy: action.payload,
        }),
        [PUT_MYBUDDY]: (state, action) => ({
            ...state,
            putResult: action.payload,
        }),
    },
    initialState
);

/* 리듀서 */
const myMatchReducer = handleActions(
    {
        [GET_MY_MATCH]: (state, action) => ({
            ...state,
            matchDetails: action.payload,
        }),
        [DELETE_MY_MATCH]: (state, action) => ({
            ...state,
            matchDetails: {
                ...state.matchDetails,
                buddyMatchDataList: state.matchDetails.buddyMatchDataList.filter(
                    (match) => match.buddyMatchCode !== action.payload
                ),
            },
        }),
    },
    initialState
);

export { myProfileReducer, myScheduleReducer, myBuddyReducer, myMatchReducer };