import { GET_MEMBER, POST_LOGIN, POST_REGISTER } from '../modules/MemberModule';

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
        console.log('API 응답:', result);
        dispatch({type: GET_MEMBER, payload: result });
        console.log('액션 디스패치 완료');
    }}