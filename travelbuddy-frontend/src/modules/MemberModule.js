import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBERS = 'member/GET_MEMBERS';
export const GET_MEMBER = 'member/GET_MEMBER';
export const POST_MEMBER = 'member/POST_MEMBER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_SIGNUP = 'member/POST_SIGNUP';
export const POST_EMAIL = 'member/POST_EMAIL';

const actions = createActions({
	[GET_MEMBERS]: () => {},
	[GET_MEMBER]: () => {},
	[POST_MEMBER]: () => {},
	[POST_LOGIN]: () => {},
	[POST_SIGNUP]: () => {}
	// [POST_EMAIL]: () => {}
});

/* 리듀서 */
const memberReducer = handleActions(
	{
		[GET_MEMBERS]: (state, { payload }) => {

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
		[GET_MEMBER]: (state, { payload }) => {

			return payload;
		},
		[POST_MEMBER]: (state, { payload }) => {

			return payload;
		},
		[POST_LOGIN]: (state, { payload }) => {
			return payload;
		},
		[POST_SIGNUP]: (state, { payload }) => {
			return payload;
		}
		// [POST_EMAIL]: (state, { payload }) => {
		// 	return payload;
		// }
	},
	initialState
);

export default memberReducer;
