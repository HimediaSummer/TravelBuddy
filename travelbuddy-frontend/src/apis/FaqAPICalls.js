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

// 관리자가 Faq 전체 리스트를 확인한다.
export const callFaqListForAdminAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/faqs`;
    console.log('잘받고있나 ?');
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
