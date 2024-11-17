import { GET_QNAS, GET_QNA, GET_QNAANSWER, GET_FQTYPE, POST_QNA, POST_REGISTER } from '../modules/QnaModule';

export const callQnaListForAdminAPI = ({currentPage}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: GET_QNAS, payload: result });
    }}
    
export const callQnaDetailForAdminAPI = ({qnaCode}) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas/${qnaCode}`;
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }).then((response) => response.json());
            dispatch({type: GET_QNA, payload: result });
        }}


    export const callQnaAnswerAPI = ({qnaCode}) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas/${qnaCode}`;
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }).then((response) => response.json());
            dispatch({type: GET_QNAANSWER, payload: result });
        }}

    export const callFqTypeAPI = () => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas/getfqtype`;
        console.log('api 갔다오는거 확인');
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }).then((response) => response.json());
            dispatch({type: GET_FQTYPE, payload: result });
            console.log('가져온 result 값',result);
        }}