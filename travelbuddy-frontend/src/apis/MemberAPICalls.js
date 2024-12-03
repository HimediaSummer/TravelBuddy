import { GET_MEMBERS, GET_MEMBER, POST_MEMBER, POST_LOGIN, POST_SIGNUP, POST_EMAIL } from '../modules/MemberModule';

// 멤버 정보를 불러온다
export const callGetMemberAPI = ({ memberName }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/${memberName}`;


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



		dispatch({ type: GET_MEMBER, payload: result });
	};
};

// 로그인을 신청한다
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

		if (result.status === 200) {
			if(result.data.memberLeave) {
				alert("유저를 찾을 수 없습니다.")
				return;
			}
			if(result.data.memberSuspension) {
				alert("해당유저는 정지 상태 입니다.")
				return;
			}
			window.localStorage.setItem('accessToken', result.data.accessToken);
		} else if (result.status === 400) {
			alert(result.message); // 로그인 실패 시 메시지를 alert로 표시
		}
		dispatch({ type: POST_LOGIN, payload: result });
	};
};

// 로그아웃을 원한다!
export const callLogoutAPI = () => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_LOGIN, payload: '' });
	};
};

// 회원가입 등록을 한다.
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


		if (result.status === 201) {
			dispatch({ type: POST_SIGNUP, payload: result });
		} else if (result.status === 400) {
			alert(result.message);
		}
	};
};

// 관리자가 회원 전체 리스트를 확인한다.
export const callMemberListForAdminAPI = ( {currentPage} ) => {
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members?offset=${currentPage}`;
    } else {
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members`;
    }
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
        if (result.status !== null) {
			dispatch({type: GET_MEMBERS, payload: result.data });
		}
    };
};

// 관리자가 회원 전체 이름을 들고 가져간다.
export const callMemberAllNameAPI = () => {
    let requestURL;
    requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/name`;
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
        if (result.status !== null) {
			dispatch({type: GET_MEMBERS, payload: result.data });
		}
    };
};

// 관리자가 회원 전체 리스트에서 검색한다.
export const callSearchMemberListAPI = ( search ) => {
    let requestURL;
    if (search !== undefined && search !== null) {
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/search?s=${encodeURIComponent(search)}`;
    }
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
        if (result.status !== null) {
			dispatch({type: GET_MEMBERS, payload: result.data });
		}
    };
};

// 관리자가 회원 1명의 상세정보를 확인한다.
export const callMemberDetailForAdminAPI = ({memberCode}) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/${memberCode}`;
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
            dispatch({type: GET_MEMBER, payload: result });
        }}


        // 관리자가 회원 정지상태를 전환한다. (Y <=> N)
export const toggleMemberSuspensionAPI = ({memberCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/${memberCode}/toggle-suspension`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization:
                'Bearer ' + window.localStorage.getItem('accessToken')
            }
        }).then((response) => response.json());
        dispatch({type: POST_MEMBER, payload: result });
    }}

    // 관리자가 회원 탈퇴상태를 전환한다. (Y <=> N)
export const toggleMemberDeletionAPI = ({memberCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/${memberCode}/toggle-deletion`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization:
                'Bearer ' + window.localStorage.getItem('accessToken')
            }
        }).then((response) => response.json());
        dispatch({type: POST_MEMBER, payload: result });
    }}

			export const callFindIdAPI = ({ Email }) => {
				const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/findid`;

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

					return data; // memberCode 반환
				} else {
					throw new Error('Failed to fetch member code');
				}
			};
			
			// 로그인 후 memberCode 가져오기
			export const handleLogin = async (form) => {
				// 로그인 API 호출
				const result = await callLoginAPI({ form });
			
				// memberName을 사용하여 memberCode 가져오기
				const memberCode = await getMemberCode(form.memberName);
				window.localStorage.setItem('memberCode', memberCode); // memberCode 저장
			};
