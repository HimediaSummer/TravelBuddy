import { GET_USEINFOS, GET_USEINFO, PUT_USEINFO, POST_USEINFO, DELETE_USEINFO } from '../modules/UseinfoModule';

// 회원이 USEINFO 전체 리스트를 확인한다 paging 처리
export const callUseinfoListAPI = ({currentPage}) => {
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/useinfos?offset=${currentPage}`;
        console.log('지금 나의 주소는?',requestURL);
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/useinfos`;
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
        dispatch({type: GET_USEINFOS, payload: result.data });
    }}

// 관리자가 USEINFO 전체 리스트를 확인한다. paging 처리
export const callUseinfoListForAdminAPI = ({currentPage}) => {
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos`;
    }
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_USEINFOS, payload: result.data });
    }}

        // 관리자가 USEINFO 1개를 상세 조회한다.
export const callUseinfoDetailForAdminAPI = (useinfoCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos/${useinfoCode}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_USEINFO, payload: result });
    }}

            // 회원이 USEINFO 1개를 상세 조회한다.
export const callUseinfoDetailAPI = (useinfoCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/useinfos/${useinfoCode}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_USEINFO, payload: result });
    }}

           // 관리자가 USEINFO 1개를 작성한다.
export const insertUseinfoAPI = (useinfoDTO) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos/insertuseinfo`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: JSON.stringify(useinfoDTO)
        }).then((response) => response.json());
        dispatch({type: POST_USEINFO, payload: result });
    }}

               // 관리자가 USEINFO 1개를 수정한다.
export const updateUseinfoAPI = (useinfoCode, updateData) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos/${useinfoCode}/updateuseinfo`;
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
        dispatch({type: PUT_USEINFO, payload: result });
    }}

        // 관리자가 USEINFO 1개를 삭제한다.
export const deleteUseinfoAPI = (useinfoCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos/${useinfoCode}/deleteuseinfo`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: DELETE_USEINFO, payload: result });
    }}
