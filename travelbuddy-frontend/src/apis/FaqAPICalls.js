import { GET_FAQS, GET_FAQ, PUT_FAQ, POST_FAQ, DELETE_FAQ } from '../modules/FaqModule';

// 회원이 Faq 전체 리스트를 확인한다.
export const callFaqListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/faqs`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_FAQS, payload: result });
    }}

// 관리자가 Faq 전체 리스트를 확인한다. paging 처리
export const callFaqListForAdminAPI = ({currentPage}) => {
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/faqs?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/faqs`;
    }
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_FAQS, payload: result });
    }}

    // 관리자가 Faq 전체 리스트에서 검색한다.
export const callSearchFaqListAPI = ( search ) => {
    let requestURL;
    if (search !== undefined && search !== null) {
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/faqs/search?f=${encodeURIComponent(search)}`;
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
			dispatch({type: GET_FAQS, payload: result.data });
		}
    };
};

        // 관리자가 FAQ 1개를 상세 조회한다.
export const callFaqDetailForAdminAPI = (faqCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/faqs/${faqCode}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_FAQ, payload: result });
    }}

           // 관리자가 FAQ 1개를 작성한다.
export const insertFaqAPI = (faqDTO) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/faqs/insertfaq`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization:
                'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(faqDTO)
        }).then((response) => response.json());
        dispatch({type: POST_FAQ, payload: result });
    }}

               // 관리자가 FAQ 1개를 수정한다.
export const updateFaqAPI = (faqCode, updateData) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/faqs/${faqCode}/updatefaq`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization:
                'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(updateData)
        }).then((response) => response.json());
        dispatch({type: PUT_FAQ, payload: result });
    }}

        // 관리자가 FAQ 를 삭제한다.
export const deleteFaqAPI = (faqCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/faqs/${faqCode}/deletefaq`;
    console.log('내가 받은 faqCode 는?',faqCode);
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization:
                'Bearer ' + window.localStorage.getItem('accessToken')
            }
        }).then((response) => response.json());
        dispatch({type: DELETE_FAQ, payload: result });
    }}
