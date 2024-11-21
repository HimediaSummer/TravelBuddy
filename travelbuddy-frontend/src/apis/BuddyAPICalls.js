import { GET_BUDDIES, GET_BUDDY, POST_BUDDY } from '../modules/BuddyModule';

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
		// console.log("API응답:",result);
        dispatch({type: GET_BUDDIES, payload: result });
		
    }}
    
export const callBuddyDetailAPI = ({buddyCode}) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies/${buddyCode}`;
        console.log("buddyCdoe = ", buddyCode)
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

        // 게시글 작성한다.
    export const callBuddyRegistAPI = (updateForm) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies/buddyRegist`;
        console.log("callBuddyRegistAPI 갔다옴");
        console.log("API form = ", updateForm);
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                },
                body: JSON.stringify(updateForm)
            }).then((response) => {
                response.json()});

            console.log("accessToken = ", window.localStorage.getItem('accessToken'))
            console.log("[BuddyAPICalls] callBuddyRegistAPI result : ", result);
            console.log("API응답:",result);
            dispatch({type: POST_BUDDY, payload: result});
        }}

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