import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callQnaDetailForAdminAPI
} from '../../apis/QnaAPICalls';
import {
    insertQnaAnswerAPI} from '../../apis/QnaAPICalls';
import {
    updateQnaAnswerAPI} from '../../apis/QnaAPICalls';
import {
    deleteQnaAnswerAPI} from '../../apis/QnaAPICalls';

function QnaDetail () {

    // const [qnaContents, setQnaContents] = useState('');
    const dispatch = useDispatch();
    const params = useParams();
    const qnaData = useSelector((state) => state.qnaReducer);
    const {data} = qnaData;
    const {qnaDTO, qnaAnswerDTO} = data || {};
    console.log('data 가 가지고있는것',data);

 
    useEffect (
        () => {
            dispatch(callQnaDetailForAdminAPI(params))
        } , []
    );

    // useEffect (
    //     () => {
    //         if (qna) {
    //             setQnaContents();
    //         }
    //     }, [qna]
    // );


    return (
        <div>
        <table>
            <thead>
                <tr>
                <th>문의(Q&A)</th>
                </tr>
            </thead>
            <tbody>
                {qnaDTO ? (
                    <>
                <tr>
                <td>제목</td>
                <td>{qnaDTO.qnaTitle}</td>
                <td>문의유형</td>
                <td>{qnaDTO.fqTypeCode}</td>
                <td><button>삭제</button></td>
                </tr>

                <tr>
                <td colSpan={4}>{qnaDTO.qnaContents}</td>
                </tr>

                <tr>
                <td>답변 작성</td>
                <td>{qnaAnswerDTO.ansContents}</td>
                </tr>

                <tr>
                </tr>
                <tr>
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td><button>답변 등록</button></td>
                    <td><button>답변 수정</button></td>
                    <td><button>답변 삭제</button></td>
                </tr>
                </>
                ) : (
                    <tr>
                            <td colSpan="2">로딩 중...</td> {/* 데이터가 없을 때 로딩 메시지 */}
                        </tr>
                )}
            </tbody>
        </table>
        </div>
    ) 
}

export default QnaDetail