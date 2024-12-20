import { GET_FQTYPE,} from '../modules/FqTypeModule';

        // FAQType 의 code + name 을 리스트 정보로 불러온다.
        export const callFqTypeNameAPI = (faqCode) => {
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/fqtype/getname`;
            console.log('백엔드 대문 앞')
            return async (dispatch, getState) => {
                const result = await fetch(requestURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*'
                    }
                }).then((response) => response.json());
                dispatch({type: GET_FQTYPE, payload: result });
                console.log('뒤에서 가져왔어',result);
            }}

