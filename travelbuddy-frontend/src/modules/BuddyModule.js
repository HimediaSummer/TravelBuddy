import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_BUDDIES = 'buddyBoard/buddies/GET_BUDDIES';
export const GET_BUDDY = 'buddyBoard/buddies/GET_BUDDY';
// export const GET_QNAANSWER = 'qna/GET_QNAANSWER';
// export const GET_BUDDYTYPE = 'buddyBoard/GET_BUDDYTYPE';
export const POST_BUDDY = 'buddyBoard/buddies/POST_QNA';
// export const POST_REGISTER = 'qna/POST_REGISTER';

const actions = createActions({
	[GET_BUDDIES]: () => {},
	[GET_BUDDY]: () => {},
	// [GET_QNAANSWER]: () => {},
	// [GET_BUDDYTYPE]: () => {},
	[POST_BUDDY]: () => {},
	// [POST_REGISTER]: () => {}
});

/* 리듀서 */
const buddiesReducer = handleActions(
	{
		[GET_BUDDIES]: (state, { payload }) => {
			console.log("리듀서에서 받은 payload", payload);
			return payload;
		},
		[GET_BUDDY]: (state, { payload }) => {
			console.log("리듀서에서 받은 payload", payload);
			return payload;
		},
		// [GET_QNAANSWER]: (state, { payload }) => {
		// 	return payload;
		// },
		// [GET_BUDDYTYPE]: (state, { payload }) => {
		// 	return payload;
		// },
		[POST_BUDDY]: (state, { payload }) => {
			console.log("리듀서에서 받은 payload", payload);
			return payload;
		},
		// [POST_REGISTER]: (state, { payload }) => {
		// 	return payload;
		// }
	},
	initialState
);

export default buddiesReducer;
