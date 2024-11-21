// import { createAction } from 'redux-actions';

// const initialState = [];

// export const GET_SCHEDULE_DETAIL = 'GET_SCHEDULE_DETAIL';

// export const getScheDetail = createAction(GET_SCHEDULE_DETAIL);

// /* 리듀서 */
// const myScheDetailReducer = (state = [], action) => {

//     console.log('Reducer received action:', action);

// 	switch (action.type) {
//         case 'mySche/GET_SCHEDULE_DETAIL':

//             console.log('Reducer is myScheDetail', action.payload);

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

// export default myScheDetailReducer;