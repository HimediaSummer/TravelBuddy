import { createAction } from 'redux-actions';

const initialState = [];

export const GET_BUDDY_DETAIL = 'GET_BUDDY_DETAIL';

export const getBuddyDetail = createAction(GET_BUDDY_DETAIL);

/* 리듀서 */
const myBuddyDetailReducer = (state = [], action) => {

    console.log('Reducer received action:', action);

	switch (action.type) {
        case 'myBuddy/GET_BUDDY_DETAIL':

            console.log('Reducer is myBuddyDetail', action.payload);

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

export default myBuddyDetailReducer;