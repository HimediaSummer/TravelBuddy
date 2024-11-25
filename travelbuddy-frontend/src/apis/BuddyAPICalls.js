import { GET_BUDDIES, GET_BUDDY, POST_BUDDY, PUT_BUDDY } from '../modules/BuddyModule';

//게시글 전체조회
export const callBuddiesListAPI = ({currentPage}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies?offset`;
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
    
    //게시글 상세 조회
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
    export const callBuddyRegistAPI = (formData) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddyRegist`;
        console.log("callBuddyRegistAPI 갔다옴");

        console.log("API form = ", formData);
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    Authorization: 
                        'Bearer ' + window.localStorage.getItem('accessToken')
                },
                // body: JSON.stringify(updateForm)
                body: formData
            }).then((response) => 
                response.json());

            // console.log("accessToken = ", window.localStorage.getItem('accessToken'))
            console.log("[BuddyAPICalls] callBuddyRegistAPI result : ", result);
            console.log("API응답:",result);
            dispatch({type: POST_BUDDY, payload: result});
        }}

        //게시글 수정
    export const callBuddyUpdateAPI = (formData) => {
        console.log('[callBuddyUpdateAPI 옴]');

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        
        console.log("API form = ", formData);

        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddyUpdate/${formData.buddyCode}`;
        console.log('callBuddyUpdateAPI 갔다오는거 확인');
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    Accept: '*/*',
                    Authorization:
					    'Bearer ' + window.localStorage.getItem('accessToken')
                },
                // body: JSON.stringify(formData)
                body: formData
            }).then((response) => response.json());
            console.log("accessToken = ", window.localStorage.getItem('accessToken'))
            console.log("[BuddyAPICalls] callBuddyUpdateAPI result : ", result);
            console.log('callBuddyUpdateAPI 가져온 result 값',result);
            dispatch({type: PUT_BUDDY, payload: result });
        }}

        // 권한이 있을경우 상세조회
        export const callbuddyDetailForAccountAPI = ({ buddyCode }) => {
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies/${buddyCode}`;
            console.log("buddyCode = ", buddyCode)
            return async (dispatch, getState) => {
                const result = await fetch(requestURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization:
                            'Bearer ' + window.localStorage.getItem('accessToken')
                    }
                }).then((response) => response.json());
                console.log("accessToken = ", window.localStorage.getItem('accessToken'))
                console.log('[BuddyAPICalls] callbuddyDetailForAccountAPI RESULT : ', result);
                if (result.status === 200) {
                    console.log('[BuddyAPICalls] callbuddyDetailForAccountAPI SUCCESS');
                    dispatch({ type: GET_BUDDY, payload: result.data });
                }
            };
        };

        // 게시글 삭제
        export const callBuddyDeleteAPI = (buddyCode) => {
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies/${buddyCode}`;
            console.log("buddyCode = ", buddyCode)
            console.log("삭제 API 옴")
            return async (dispatch) => {
                const result = await fetch(requestURL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                    }
                });

                console.log("삭제 result", result);

                if (!result.ok) {
                    throw new Error("게시글 삭제 실패");
                }
                return result.json();
            };
        };

        