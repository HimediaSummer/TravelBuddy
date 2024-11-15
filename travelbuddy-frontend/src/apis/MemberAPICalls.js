import { GET_MEMBER, POST_LOGIN, POST_REGISTER, POST_SIGNUP } from '../modules/MemberModule';

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
				// 'Access-Control-Allow-Origin': '*'
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

export const callMemberListForAdminAPI = ({ currentPage }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members?page=${currentPage}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*',
				Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
			}
		}).then((response) => response.json());

		console.log('[MemberAPICalls] callMemberListForAdminAPI RESULT : ', result);
		dispatch({ type: GET_MEMBER, payload: result });
	};
};
