import { GET_QNAS, GET_QNA, POST_QNA, POST_REGISTER } from '../modules/QnaModule';

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

        // export const toggleMemberSuspensionAPI = ({memberCode}) => {
        //     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/${memberCode}/toggle-suspension`;
        //     return async (dispatch, getState) => {
        //         const result = await fetch(requestURL, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Accept: '*/*'
        //             }
        //         }).then((response) => response.json());
        //         dispatch({type: POST_MEMBER, payload: result });
        //     }}

        //     export const toggleMemberDeletionAPI = ({memberCode}) => {
        //         const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/members/${memberCode}/toggle-deletion`;
        //         return async (dispatch, getState) => {
        //             const result = await fetch(requestURL, {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     Accept: '*/*'
        //                 }
        //             }).then((response) => response.json());
        //             console.log('API 응답:', result);
        //             dispatch({type: POST_MEMBER, payload: result });
        //             console.log('액션 디스패치 완료');
        //         }}