import { GET_QNAS, GET_QNA, POST_QNA, DELETE_QNA, GET_QNAANSWER, POST_QNAANSWER, PUT_QNAANSWER, DELETE_QNAANSWER} from '../modules/QnaModule';

    // 관리자가 QnA 리스트를 전체 불러온다.(paging 처리)
export const callQnaListForAdminAPI = ({currentPage}) => {
    
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas?offset=${currentPage}`;
        console.log('지금 나의 주소는?',requestURL);
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas`;
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
            dispatch({type: GET_QNAS, payload: result });
        }
    }}

    // 회원이 자신이 작성한 QnA 리스트를 전체 불러온다.(paging 처리)
export const callQnaListAPI = ({currentPage}) => {
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/qnas?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/qnas`;
    }
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
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: JSON.stringify(qnaDTO)
        }).then((response) => response.json());
        dispatch({type: POST_QNA, payload: result });
    }}

    // 관리자든 회원이든 QnA 삭제한다.
export const deleteQnaAPI = (qnaCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cs/qnas/${qnaCode}/deleteqna`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        dispatch({type: DELETE_QNA, payload: result });
    }}

    // 관리자가 QnA 1개를 상세 조회한다.
export const callQnaDetailForAdminAPI = (qnaCode) => {
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
export const callQnaDetailAPI = (qnaCode) => {
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

    // 관리자가 QnA 답변을 추가한다 (사실상 answer 의 null 을 text 로 수정하는것과 같다.).
export const insertQnaAnswerAPI = (qnaCode,updatedAnswerState) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/qnas/${qnaCode}/insertanswer`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
                },
                body: JSON.stringify(updatedAnswerState)
        }).then((response) => response.json());
        dispatch({type: POST_QNAANSWER, payload: result });
    }}

    // 관리자가 QnA 답변을 수정한다. 위의 코드가 기능 중복되어 사용 안함
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
export const deleteQnaAnswerAPI = (qnaCode) => {
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
