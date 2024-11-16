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
        dispatch({type: GET_MEMBER, result });
        console.log('백엔드에서 가져온 데이터',result);
    }}