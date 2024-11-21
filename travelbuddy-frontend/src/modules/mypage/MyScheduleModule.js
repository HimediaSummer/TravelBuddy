import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_SCHEDULE = 'GET_SCHEDULE';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';

export const getSchedule = createAction(GET_SCHEDULE);
export const deleteSchedule = createAction(DELETE_SCHEDULE);

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
    },
    initialState
);
export default myScheduleReducer;