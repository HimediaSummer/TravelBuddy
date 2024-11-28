import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_REGIONS = 'buddyBoard/region/GET_REGIONS';
export const GET_BUDDYTYPE = 'buddyBoard/buddies/GET_BUDDY';

const actions = createActions({
	[GET_REGIONS]: () => {},
	[GET_BUDDYTYPE]: () => {}
});

/* 리듀서 */
const regionBuddyTypeReducer = handleActions(
	{
		[GET_REGIONS]: (state, { payload }) => {
					if (Array.isArray(payload)) {
						return {
							data: payload,
							pageInfo: {
								...payload,
								total: payload.length
							}
						}
					}
			console.log("리듀서에서 받은 payload", payload);
			return payload;
		},
		[GET_BUDDYTYPE]: (state, { payload }) => {
			// console.log("리듀서에서 받은 payload", payload);
			return payload;
		}
	},
	initialState
);

export default regionBuddyTypeReducer;
