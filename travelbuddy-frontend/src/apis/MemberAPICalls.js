import { GET_MEMBERS, GET_MEMBER, POST_MEMBER, POST_REGISTER } from '../modules/MemberModule';

export const callMemberListForAdminAPI = ({currentPage}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_MEMBERS, payload: result });
    }}
    
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