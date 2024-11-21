import { GET_NOTICES, GET_NOTICE, PUT_NOTICE, POST_NOTICE, DELETE_NOTICE } from '../modules/NoticeModule';

// 회원이 Notice 전체 리스트를 확인한다 paging 처리
export const callNoticeListAPI = ({currentPage}) => {
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/notices?offset=${currentPage}`;
        console.log('지금 나의 주소는?',requestURL);
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/notices`;
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
        dispatch({type: GET_NOTICES, payload: result.data });
    }}

// 관리자가 Notice 전체 리스트를 확인한다. paging 처리
export const callNoticeListForAdminAPI = ({currentPage}) => {
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/notices?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/notices`;
    }
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_NOTICE, payload: result.data });
    }}

        // 관리자가 Notice 1개를 상세 조회한다.
export const callNoticeDetailForAdminAPI = (noticeCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/notices/${noticeCode}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_NOTICE, payload: result });
    }}

            // 회원이 Notice 1개를 상세 조회한다.
export const callNoticeDetailAPI = (noticeCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/notices/${noticeCode}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_NOTICE, payload: result });
    }}

           // 관리자가 Notice 1개를 작성한다.
export const insertNoticeAPI = (noticeDTO) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/notices/insertnotice`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: JSON.stringify(noticeDTO)
        }).then((response) => response.json());
        dispatch({type: POST_NOTICE, payload: result });
    }}

               // 관리자가 Notice 1개를 수정한다.
export const updateNoticeAPI = (noticeCode, updateData) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/notices/${noticeCode}/updatenotice`;
    console.log('내가 받은 거',updateData);
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: JSON.stringify(updateData)
        }).then((response) => response.json());
        dispatch({type: PUT_NOTICE, payload: result });
    }}

        // 관리자가 Notice 1개를 삭제한다.
export const deleteNoticeAPI = (noticeCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/notices/${noticeCode}/deletenotice`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: DELETE_NOTICE, payload: result });
    }}
