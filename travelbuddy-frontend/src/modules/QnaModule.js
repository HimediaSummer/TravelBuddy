import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_QNAS = 'qna/GET_QNAS';
export const GET_QNA = 'qna/GET_QNA';
export const POST_QNA = 'qna/POST_QNA';
export const POST_REGISTER = 'qna/POST_REGISTER';

const actions = createActions({
	[GET_QNAS]: () => {},
	[GET_QNA]: () => {},
	[POST_QNA]: () => {},
	[POST_REGISTER]: () => {}
});

/* 리듀서 */
const qnaReducer = handleActions(
	{
		[GET_QNAS]: (state, { payload }) => {
			return payload;
		},
		[GET_QNA]: (state, { payload }) => {
			return payload;
		},
		[POST_QNA]: (state, { payload }) => {
			return payload;
		},
		[POST_REGISTER]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default qnaReducer;
