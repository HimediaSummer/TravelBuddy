import { putProfile, getProfile } from '../modules/mypage/MyProfileModule';

export const callMyProfileAPI = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('/mypage/myprofile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Data from API!!!!!!!!!!!!!!!!!!!!!!!:', data);

            if (Array.isArray(data)) {
                dispatch(getProfile(data)); // Redux 액션 디스패치
            } else if (data.data && Array.isArray(data.data)) {
                dispatch(getProfile(data.data)); // Redux 액션 디스패치
            } else {
                throw new Error('Unexpected data structure');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            // 에러 상태 관리가 필요하면 여기서 별도 디스패치 가능
        }
    };
};

// 회원정보 수정 API
export const updateProfileAPI = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch('/mypage/updatemyprofile', {
                method: "PUT",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const data = await response.json();
            console.log("Updated profile data:", data);

            dispatch(putProfile(data));
            alert("회원정보가 수정되었습니다.");
            navigate('/mypage/myprofile');
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
};


















// export const callMyProfileAPI = () => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mypage/myprofile`;
// 	console.log('callBuddiesListAPI 갔다오는거 확인');
//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 Authorization:
// 					'Bearer ' + window.localStorage.getItem('accessToken')
                    
//             }
//         }).then((response) => response.json());
// 		// console.log("API응답:",result);
//         dispatch(getProfile(result));
		
//     }}
//     console.log("JWT Token:", window.localStorage.getItem('accessToken'));
    
// export const callBuddyDetailAPI = ({buddyCode}) => {
//         const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies/${buddyCode}`;
//         console.log("buddyCdoe = ", buddyCode)
//         return async (dispatch, getState) => {
//             const result = await fetch(requestURL, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*'
//                 }
//             }).then((response) => response.json());
// 			console.log("API응답:",result);
//             dispatch({type: GET_BUDDY, payload: result });
//         }}

//         // 게시글 작성한다.
//     export const callBuddyRegistAPI = (updateForm) => {
//         const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/buddyBoard/buddies/buddyRegist`;
//         console.log("callBuddyRegistAPI 갔다옴");
//         console.log("API form = ", updateForm);
//         return async (dispatch, getState) => {
//             const result = await fetch(requestURL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*',
//                     Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
//                 },
//                 body: JSON.stringify(updateForm)
//             }).then((response) => {
//                 response.json()});

//             console.log("accessToken = ", window.localStorage.getItem('accessToken'))
//             console.log("[BuddyAPICalls] callBuddyRegistAPI result : ", result);
//             console.log("API응답:",result);
//             dispatch({type: POST_BUDDY, payload: result});
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