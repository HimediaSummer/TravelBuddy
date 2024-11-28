import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_BUDDIES = 'buddyBoard/buddies/GET_BUDDIES';
export const GET_BUDDY = 'buddyBoard/buddies/GET_BUDDY';
export const POST_BUDDY = 'buddyBoard/buddyRegist/POST_BUDDY';
export const PUT_BUDDY = 'buddyBoard/buddyUpdate/PUT_BUDDY';

const actions = createActions({
	[GET_BUDDIES]: () => {},
	[GET_BUDDY]: () => {},
	[POST_BUDDY]: () => {},
	[PUT_BUDDY]: () => {}
});

/* 리듀서 */
const buddiesReducer = handleActions(
	{
		[GET_BUDDIES]: (state, { payload }) => {
			// console.log("리듀서에서 받은 payload", payload);
			if (Array.isArray(payload)) {
				return {
					data: payload,
					pageInfo: {
						...payload,
						total: payload.length
					}
				}
			}
			return payload;
		},
		[GET_BUDDY]: (state, { payload }) => {
			console.log("리듀서에서 받은 payload", payload);
			return payload;
		},
		[POST_BUDDY]: (state, { payload }) => {
			console.log("리듀서에서 받은 payload", payload);
			return payload;
		},
		[PUT_BUDDY]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default buddiesReducer;
