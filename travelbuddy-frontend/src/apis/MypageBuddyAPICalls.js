// import {
// 	GET_BUDDYLIST
	
// } from '../modules/MypageBuddyModule.js';

// export const callMypageBuddyAPI = () => {

// 	const requestURL = `/mypage/mybuddylist`;

// 	return async (dispatch, getState) => {

// 		const result = await fetch(requestURL, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Accept: '*/*'
// 			}
// 		}).then((response) => response.json());

// 		console.log('API Response:', result);

// 		if (result.status === 200) {
//            console.log(
// 				'dddddddddddddddddd : ', 
// 				result
// 			);
// 			dispatch({ type: GET_BUDDYLIST, payload: result.data });
//         }
// 	};
// };


