import { GET_QNAS, GET_QNA, POST_QNA, GET_QNAANSWER, POST_QNAANSWER, PUT_QNAANSWER, DELETE_QNAANSWER, POST_REGISTER } from '../modules/QnaModule';

    // 관리자가 QnA 리스트를 전체 불러온다.(paging 처리)
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

    // 회원이 자신이 작성한 QnA 리스트를 전체 불러온다.(paging 처리)
export const callQnaListAPI = ({currentPage}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/qnas`;
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

        // 회원이 자신이 작성한 QnA 리스트를 전체 불러온다.
export const noPagingQnaListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/qnas`;
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

    // 회원이 QnA 1개를 작성한다.
export const insertQnaAPI = (qnaDTO) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/qnas/insertqna`;
    console.log('내가 받은 qnaDTO 는?',qnaDTO);
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: qnaDTO
        }).then((response) => response.json());
        dispatch({type: POST_QNA, payload: result });
        console.log('응답받은 result 는?',result);
    }}

    // 관리자가 QnA 1개를 상세 조회한다.
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

    //  회원이 자신이 작성한 QnA 1건을 상세 조회한다.
export const callQnaDetailAPI = ({qnaCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/qnas/${qnaCode}`;
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

// 관리자가든 회원이든 답변 조회해서 본다.
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

    // 관리자가 QnA 답변을 추가한다.
export const insertQnaAnswerAPI = ({qnaCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas/${qnaCode}/insertanswer`;
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

    // 관리자가 QnA 답변을 수정한다.
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

    // 관리자가 QnA 답변을 삭제한다.
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
