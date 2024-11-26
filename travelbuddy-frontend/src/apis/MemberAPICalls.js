import { GET_MEMBERS, GET_MEMBER, POST_MEMBER, POST_LOGIN, POST_SIGNUP, POST_EMAIL } from '../modules/MemberModule';

export const callGetMemberAPI = ({ memberName }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/${memberName}`;
	console.log("memberName = ", memberName)

	return async (dispatch, getState) => {
		// 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
		// 서버에서 cors 허용을 해주어야 함
		const result = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*',
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			}
		}).then((response) => response.json());

		console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);

		dispatch({ type: GET_MEMBER, payload: result });
	};
};

export const callLoginAPI = ({ form }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/login`;

	return async (dispatch, getState) => {
		/* 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능 */
		/* 서버에서 cors 허용을 해주어야 함 */
		/* headers에 Access-Control-Allow-Origin을 *로 해서 모든 도메인에 대해 허용한다. */
		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				memberName: form.memberName,
				memberPassword: form.memberPassword
			})
		}).then((response) => response.json());

		console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
		if (result.status === 200) {
			window.localStorage.setItem('accessToken', result.data.accessToken);
		} else if (result.status === 400) {
			alert(result.message); // 로그인 실패 시 메시지를 alert로 표시
		}
		dispatch({ type: POST_LOGIN, payload: result });
	};
};

export const callLogoutAPI = () => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_LOGIN, payload: '' });
		console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
	};
};

export const callRegisterAPI = ({ form }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/signup`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({
				memberName: form.memberName,
				memberPassword: form.memberPassword,
				memberFullName: form.memberFullName,
				memberEmail: form.memberEmail,
				memberBirthday: form.memberBirthday,
				memberPhone: form.memberPhone
			})
		}).then((response) => response.json());

		console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

		if (result.status === 201) {
			dispatch({ type: POST_SIGNUP, payload: result });
		} else if (result.status === 400) {
			alert(result.message);
		}
	};
};

export const callMemberListForAdminAPI = ( {currentPage} ) => {

    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members?offset=${currentPage}`;
        console.log('지금 나의 주소는?',requestURL);
    } else {
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members`;
        console.log('지금 나의 주소는?',requestURL);
    }
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if (result.status !== null) {
			dispatch({type: GET_MEMBERS, payload: result.data });
		}
    };
};
    
export const callMemberDetailForAdminAPI = ({memberCode}) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/${memberCode}`;
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }).then((response) => response.json());
            dispatch({type: GET_MEMBER, payload: result });
            console.log('가져온 값',result);
        }}

        export const toggleMemberSuspensionAPI = ({memberCode}) => {
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/${memberCode}/toggle-suspension`;
            return async (dispatch, getState) => {
                const result = await fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*'
                    }
                }).then((response) => response.json());
                console.log('API 응답:', result);
                dispatch({type: POST_MEMBER, payload: result });
                console.log('액션 디스패치 완료');
            }}

            export const toggleMemberDeletionAPI = ({memberCode}) => {
                const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/${memberCode}/toggle-deletion`;
                return async (dispatch, getState) => {
                    const result = await fetch(requestURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: '*/*'
                        }
                    }).then((response) => response.json());
                    dispatch({type: POST_MEMBER, payload: result });
                }}

			export const callFindIdAPI = ({ Email }) => {
				const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/findid`;
				console.log("API memberEmail = ", Email)
				return async (dispatch, getState) => {
					const result = await fetch(requestURL, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Accept: '*/*'
						},
						body: JSON.stringify({
							memberEmail: Email
						})
					}).then((response) => response.json());
			
					console.log('[MemberAPICalls] callFindIdAPI RESULT : ', result);
			
					if (result.status === 200) {
						return result.data;
					} else {
						throw new Error(result.message);
					}
				};
			};

			export const callFindPwAPI = ({ Email }) => {
				const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/findpw`;
			
				return async (dispatch, getState) => {
					const result = await fetch(requestURL, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Accept: '*/*'
						},
						body: JSON.stringify({
							memberEmail: Email
						})
					}).then((response) => response.json());
			
					console.log('[MemberAPICalls] callFindPwAPI RESULT : ', result);
			
					if (result && result.status === 200) {
						return result.data; // 인증 코드를 반환
					} else {
						throw new Error(result.message || 'Unknown error occurred');
					}
				};
			};
			
			export const callResetPwAPI = ({ Email, verificationCode, newPassword }) => {
				const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/resetpw`;
			
				return async (dispatch, getState) => {
					const result = await fetch(requestURL, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Accept: '*/*'
						},
						body: JSON.stringify({
							memberEmail: Email,
							verificationCode: verificationCode,
							memberPassword: newPassword
						})
					}).then((response) => response.json());
			
					console.log('[MemberAPICalls] callResetPwAPI RESULT : ', result);
			
					if (result && result.status === 200) {
						return true; // 비밀번호 변경 성공
					} else {
						throw new Error(result.message || 'Unknown error occurred');
					}
				};
			};

			export const getMemberCode = async (memberName) => {
				const response = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/memberCode/${memberName}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${window.localStorage.getItem("accessToken")}`
					}
				});
			
				if (response.ok) {
					const data = await response.json();
					console.log('fetch memberCode:', data);
					return data; // memberCode 반환
				} else {
					throw new Error('Failed to fetch member code');
				}
			};
			
			// 로그인 후 memberCode 가져오기
			export const handleLogin = async (form) => {
				// 로그인 API 호출
				const result = await callLoginAPI({ form });
				console.log('login result', result);
			
				// memberName을 사용하여 memberCode 가져오기
				const memberCode = await getMemberCode(form.memberName);
				window.localStorage.setItem('memberCode', memberCode); // memberCode 저장
			};
