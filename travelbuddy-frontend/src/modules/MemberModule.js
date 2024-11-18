import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBERS = 'member/GET_MEMBERS';
export const GET_MEMBER = 'member/GET_MEMBER';
export const POST_MEMBER = 'member/POST_MEMBER';
export const POST_REGISTER = 'member/POST_REGISTER';

const actions = createActions({
	[GET_MEMBERS]: () => {},
	[GET_MEMBER]: () => {},
	[POST_MEMBER]: () => {},
	[POST_REGISTER]: () => {}
});

/* 리듀서 */
const memberReducer = handleActions(
	{
		[GET_MEMBERS]: (state, { payload }) => {
			return payload;
		},
		[GET_MEMBER]: (state, { payload }) => {
			return payload;
		},
		[POST_MEMBER]: (state, { payload }) => {
			console.log('정보삭제 의 값 확인',payload);
			return payload;
		},
		[POST_REGISTER]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default memberReducer;
