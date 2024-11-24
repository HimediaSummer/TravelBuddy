import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBERS = 'member/GET_MEMBERS';
export const GET_MEMBER = 'member/GET_MEMBER';
export const POST_MEMBER = 'member/POST_MEMBER';

const actions = createActions({
	[GET_MEMBERS]: () => {},
	[GET_MEMBER]: () => {},
	[POST_MEMBER]: () => {}
});

/* 리듀서 */
const memberReducer = handleActions(
	{
		[GET_MEMBERS]: (state, { payload }) => {
			console.log('백엔드에서의 응답',payload);
			if (Array.isArray(payload)) {
				return {
					data: payload,
					pageInfo: {
						pageEnd: 1,
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
		}
	},
	initialState
);

export default memberReducer;
