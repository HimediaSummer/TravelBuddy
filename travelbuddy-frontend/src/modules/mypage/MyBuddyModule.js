import { createAction } from 'redux-actions';

const initialState = [];

export const GET_BUDDY = 'GET_BUDDY';

export const getBuddy = createAction(GET_BUDDY);

/* 리듀서 */
const myBuddyReducer = (state = [], action) => {

    console.log('Reducer received action:', action);

	switch (action.type) {
        case 'myBuddy/GET_BUDDY':

            console.log('Reducer is myBuddy', action.payload);

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

export default myBuddyReducer;