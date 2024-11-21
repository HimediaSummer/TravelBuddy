import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_PROFILE = 'GET_PROFILE';
export const PUT_PROFILE = 'PUT_PROFILE';

export const getProfile = createAction(GET_PROFILE);
export const putProfile = createAction(PUT_PROFILE);

/* 리듀서 */
const myProfileReducer = handleActions(
    {
        [GET_PROFILE]: (state, action) => ({
            ...state,
            profile: action.payload,
        }),
        [PUT_PROFILE]: (state, action) => ({
            ...state,
            updateResult: action.payload,
        }),
    },
    initialState
);
export default myProfileReducer;


// const myProfileReducer = (state = [], action) => {

//     console.log('Reducer received action:', action);

// 	switch (action.type) {
//         case 'mypage/GET_PROFILE':

//             console.log('Reducer is myProfile', action.payload);

//             if (!Array.isArray(action.payload)) {
//                 console.error('Payload is not an array:', action.payload);
//                 return state;
//             }

//             const updateState = [...action.payload];
//             console.log('Updated state:', updateState);

//             return updateState;

//         default:
//             return state;
//     }
// };

// export default myProfileReducer;