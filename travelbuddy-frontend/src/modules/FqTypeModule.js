import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_FQTYPE = 'fqType/GET_FQTYPE';
export const POST_FQTYPE = 'fqType/POST_FQTYPE';

const actions = createActions({
	[GET_FQTYPE]: () => {},
	[POST_FQTYPE]: () => {}

});

/* 리듀서 */
const fqTypeReducer = handleActions(
	{
		[GET_FQTYPE]: (state, { payload }) => {
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
		[POST_FQTYPE]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default fqTypeReducer;
