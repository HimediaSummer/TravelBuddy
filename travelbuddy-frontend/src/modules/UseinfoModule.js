import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_USEINFOS = 'useinfo/GET_USEINFOS';
export const GET_USEINFO = 'useinfo/GET_USEINFO';
export const POST_USEINFO = 'useinfo/POST_USEINFO';
export const PUT_USEINFO = 'useinfo/PUT_USEINFO';
export const DELETE_USEINFO = 'useinfo/DELETE_USEINFO';

const actions = createActions({
	[GET_USEINFOS]: () => {},
	[GET_USEINFO]: () => {},
	[POST_USEINFO]: () => {},
	[PUT_USEINFO]: () => {},
	[DELETE_USEINFO]: () => {}
});

/* 리듀서 */
const useinfoReducer = handleActions(
	{
		[GET_USEINFOS]: (state, { payload }) => {
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
		[GET_USEINFO]: (state, { payload }) => {
			return payload;
		},
		[POST_USEINFO]: (state, { payload }) => {
			return payload;
		},
		[PUT_USEINFO]: (state, { payload }) => {
			return payload;
		},
		[DELETE_USEINFO]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default useinfoReducer;
