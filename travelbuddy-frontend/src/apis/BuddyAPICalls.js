import { GET_BUDDIES, GET_BUDDY } from '../modules/BuddyModule';

export const callBuddiesListAPI = ({currentPage}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies`;
	console.log('callBuddiesListAPI 갔다오는거 확인');
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
		console.log("API응답:",result);
        dispatch({type: GET_BUDDIES, payload: result });
		
    }}
    
export const callBuddyDetailAPI = ({buddyCode}) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies/${buddyCode}`;
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }).then((response) => response.json());
			console.log("API응답:",result);
            dispatch({type: GET_BUDDY, payload: result });
        }}


//     export const callQnaAnswerAPI = ({qnaCode}) => {
//         const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas/${qnaCode}`;
//         return async (dispatch, getState) => {
//             const result = await fetch(requestURL, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*'
//                 }
//             }).then((response) => response.json());
//             dispatch({type: GET_QNAANSWER, payload: result });
//         }}

    // export const callBuddyTypeAPI = () => {
    //     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies/getBuddyType`;
    //     console.log('callBuddyTypeAPI 갔다오는거 확인');
    //     return async (dispatch, getState) => {
    //         const result = await fetch(requestURL, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Accept: '*/*'
    //             }
    //         }).then((response) => response.json());
    //         dispatch({type: GET_BUDDYTYPE, payload: result });
    //         console.log('callBuddyTypeAPI에서 가져온 result 값',result);
    //     }}