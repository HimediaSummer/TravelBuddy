import { GET_QNAS, GET_QNA, POST_QNA, GET_QNAANSWER, POST_QNAANSWER, PUT_QNAANSWER, DELETE_QNAANSWER, POST_REGISTER } from '../modules/QnaModule';

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

        export const insertQnaAnswerAPI = ({qnaCode}) => {
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/"/qnas/${qnaCode}/insertanswer`;
            return async (dispatch, getState) => {
                const result = await fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*'
                    }
                }).then((response) => response.json());
                dispatch({type: POST_QNAANSWER, payload: result });
            }}

        export const updateQnaAnswerAPI = ({qnaCode}) => {
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas/${qnaCode}/updateanswer`;
            return async (dispatch, getState) => {
                const result = await fetch(requestURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*'
                    }
                }).then((response) => response.json());
                dispatch({type: PUT_QNAANSWER, payload: result });
            }}

        export const deleteQnaAnswerAPI = ({qnaCode}) => {
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas/${qnaCode}/deleteanswer`;
            return async (dispatch, getState) => {
                const result = await fetch(requestURL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*'
                    }
                }).then((response) => response.json());
                dispatch({type: DELETE_QNAANSWER, payload: result });
            }}
