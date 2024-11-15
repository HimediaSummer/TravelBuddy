import { createActions, handleActions } from 'redux-actions';

const initialState = {buddyList: [],};

export const GET_BUDDYLIST = 'buddyList/GET_BUDDYLIST';
export const getBuddyList = (payload) => ({
    type: GET_BUDDYLIST,
    payload,
});


/* 리듀서 */
const mypageBuddyReducer = handleActions(
	{
		[GET_BUDDYLIST]: (state, { payload }) => ({
            ...state,
            buddyList: payload, // buddyList 배열 업데이트
        }),
	},
	initialState
);

export default mypageBuddyReducer;