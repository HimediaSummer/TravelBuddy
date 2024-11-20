
// // 초기값
// const initialState = {
// 	selectedRegion: null,
// 	selectedRegionDetails: null
// };

// // 액션 타입
// const GET_REGION = 'GET_REGION';
// const GET_SELECTED_REGION_DETAILS = 'GET_REGION_DETAILS';

// // 액션 생성자
// export const getRegion = (region) => ({
// 	type: GET_REGION,
// 	payload: region
// });

// export const getSelectedRegionDetails = (details) => ({
// 	type: GET_SELECTED_REGION_DETAILS,
// 	payload: details
// });

// // 리듀서
// const getRegionReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case GET_REGION:
// 			return { ...state, selectedRegion: action.payload };
// 		case GET_SELECTED_REGION_DETAILS:
// 			return { ...state, selectedRegionDetails: action.payload };
// 		default:
// 			return state;
// 	}
// };

// export default getRegionReducer;