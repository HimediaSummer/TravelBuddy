import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_QNAS = 'qna/GET_QNAS';
export const GET_QNA = 'qna/GET_QNA';
export const POST_QNA = 'qna/POST_QNA';
export const GET_QNAANSWER = 'qna/GET_QNAANSWER';
export const POST_QNAANSWER = 'qna/POST_QNAANSWER';
export const PUT_QNAANSWER = 'qna/PUT_QNAANSWER';
export const DELETE_QNAANSWER = 'qna/DELETE_QNAANSWER';
export const GET_FQTYPE = 'qna/GET_FQTYPE';
export const POST_REGISTER = 'qna/POST_REGISTER';

const actions = createActions({
	[GET_QNAS]: () => {},
	[GET_QNA]: () => {},
	[POST_QNA]: () => {},
	[GET_QNAANSWER]: () => {},
	[POST_QNAANSWER]: () => {},
	[PUT_QNAANSWER]: () => {},
	[DELETE_QNAANSWER]: () => {},
	[GET_FQTYPE]: () => {},
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
			console.log('그럼 paylaod의 값은?', payload);
			return payload;
		},
		[GET_QNAANSWER]: (state, { payload }) => {
			return payload;
		},
		[POST_QNAANSWER]: (state, { payload }) => {
			return payload;
		},
		[PUT_QNAANSWER]: (state, { payload }) => {
			return payload;
		},
		[DELETE_QNAANSWER]: (state, { payload }) => {
			return payload;
		},
		[GET_FQTYPE]: (state, { payload }) => {
			return payload;
		},
		[POST_REGISTER]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default qnaReducer;
