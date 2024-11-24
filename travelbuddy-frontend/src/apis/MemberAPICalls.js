import { GET_MEMBERS, GET_MEMBER, POST_MEMBER } from '../modules/MemberModule';

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
                Accept: '*/*'
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
    console.log('키워드가 뭡니까?',search);
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

// 관리자가 회원 1명의 상세정보를 확인한다.
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
        }}


        // 관리자가 회원 정지상태를 전환한다. (Y <=> N)
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
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: POST_MEMBER, payload: result });
    }}
