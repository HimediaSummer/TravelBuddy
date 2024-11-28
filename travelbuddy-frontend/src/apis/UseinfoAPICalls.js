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

            // 관리자가 useinfo 전체 리스트에서 검색한다.
export const callSearchUseinfoListAPI = ( search ) => {
    let requestURL;
    if (search !== undefined && search !== null) {
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos/search?u=${encodeURIComponent(search)}`;
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
			dispatch({type: GET_USEINFOS, payload: result.data });
		}
    };
};

    // 누군가가 Useinfo 1개를 클릭했을때 조회수를 올린다.
    export const appendUseinfoCountAPI = (useinfoCode, updateData) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos/${useinfoCode}/appendcount`;
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                },
                body: JSON.stringify(updateData)
            }).then((response) => response.json());
            dispatch({type: POST_USEINFO, payload: result });
        }}


           // 관리자가 USEINFO 1개를 작성한다.
export const insertUseinfoAPI = ({useinfoDTO}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/useinfos/insertuseinfo`;
    for (const pair of useinfoDTO.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }
    return async (dispatch, getState) => {
        try {
            if (!process.env.REACT_APP_RESTAPI_IP) {
                throw new Error('API 서버 주소가 설정되지 않았습니다.');
            }

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*'
            },
            body: useinfoDTO
        }).then((response) => response.json());
        dispatch({type: POST_USEINFO, payload: result });
        console.log('백엔드에서 가져온 값',result);
        
    } catch (error) {
        console.error('useinfo 등록 중 오류 발생: ', error);
        throw error;
    }}}

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
