import { GET_MEMBERS, GET_MEMBER, POST_MEMBER } from '../modules/MemberModule';

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
