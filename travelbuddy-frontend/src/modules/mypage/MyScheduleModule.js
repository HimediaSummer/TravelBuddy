import { createAction } from 'redux-actions';

const initialState = [];

export const GET_SCHEDULE = 'GET_SCHEDULE';

export const getSchedule = createAction(GET_SCHEDULE);

/* 리듀서 */
const myScheduleReducer = (state = [], action) => {

    console.log('Reducer received action:', action);

	switch (action.type) {
        case 'mySchedule/GET_SCHEDULE':

            console.log('Reducer is mySchedule', action.payload);

            if (!Array.isArray(action.payload)) {
                console.error('Payload is not an array:', action.payload);
                return state;
            }

            const updateState = [...action.payload];
            console.log('Updated state:', updateState);

            return updateState;

        default:
            return state;
    }
};

export default myScheduleReducer;