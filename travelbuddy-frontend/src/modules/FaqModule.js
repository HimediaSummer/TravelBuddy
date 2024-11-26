import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_FAQS = 'faq/GET_FAQS';
export const GET_FAQ = 'faq/GET_FAQ';
export const POST_FAQ = 'faq/POST_FAQ';
export const PUT_FAQ = 'faq/PUT_FAQ';
export const DELETE_FAQ = 'faq/DELETE_FAQ';

const actions = createActions({
	[GET_FAQS]: () => {},
	[GET_FAQ]: () => {},
	[POST_FAQ]: () => {},
	[PUT_FAQ]: () => {},
	[DELETE_FAQ]: () => {}
});

/* 리듀서 */
const faqReducer = handleActions(
	{
		[GET_FAQS]: (state, { payload }) => {
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
		[GET_FAQ]: (state, { payload }) => {
			return payload;
		},
		[POST_FAQ]: (state, { payload }) => {
			return payload;
		},
		[PUT_FAQ]: (state, { payload }) => {
			return payload;
		},
		[DELETE_FAQ]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default faqReducer;
