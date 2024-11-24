import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_NOTICES = 'notice/GET_NOTICES';
export const GET_NOTICE = 'notice/GET_NOTICE';
export const POST_NOTICE = 'notice/POST_NOTICE';
export const PUT_NOTICE = 'notice/PUT_NOTICE';
export const DELETE_NOTICE = 'notice/DELETE_NOTICE';

const actions = createActions({
	[GET_NOTICES]: () => {},
	[GET_NOTICE]: () => {},
	[POST_NOTICE]: () => {},
	[PUT_NOTICE]: () => {},
	[DELETE_NOTICE]: () => {}
});

/* 리듀서 */
const noticeReducer = handleActions(
	{
		[GET_NOTICES]: (state, { payload }) => {
			return payload;
		},
		[GET_NOTICE]: (state, { payload }) => {
			return payload;
		},
		[POST_NOTICE]: (state, { payload }) => {
			return payload;
		},
		[PUT_NOTICE]: (state, { payload }) => {
			return payload;
		},
		[DELETE_NOTICE]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default noticeReducer;
