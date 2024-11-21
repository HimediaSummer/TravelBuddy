import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {callQnaDetailForAdminAPI} from '../../../apis/QnaAPICalls';
import {insertQnaAnswerAPI} from '../../../apis/QnaAPICalls';
import {deleteQnaAPI} from '../../../apis/QnaAPICalls';
import {deleteQnaAnswerAPI} from '../../../apis/QnaAPICalls';

function QnaDetail () {

    const [answerState, setAnswerState] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {qnaCode} = params;
    const qnaData = useSelector((state) => state.qnaReducer);
    const {data} = qnaData;
    const {qnaDTO, qnaAnswerDTO} = data || {};

 
    useEffect (
        () => {
            dispatch(callQnaDetailForAdminAPI(qnaCode))
        } , []
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        console.log(answerState);
        setAnswerState((state) => ({ ...state, [name]: value }));
    }
    const onClickChangeHandlerInsert = () => {
        const now = new Date();
        const formattedDate = now.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\. /g, '-').replace(',', '');
        const updatedAnswerState = { ...answerState, ansCreate: formattedDate};
        dispatch(insertQnaAnswerAPI(qnaCode,updatedAnswerState))
        alert('답변이 등록되었습니다.');
        navigate(`/Qnas`);
    };

    const onClickChangeHandlerDelete = () => {
        dispatch(deleteQnaAnswerAPI(qnaCode))
        alert('답변이 삭제되었습니다.');
        navigate(`/Qnas`);
    };

    const onClickQnaDelete = () => {
        dispatch(deleteQnaAPI(qnaCode))
        alert('문의가 삭제되었습니다.');
        navigate(`/Qnas`);
    };

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
                <td><button onClick={onClickQnaDelete}>삭제</button></td>
                </tr>

                <tr>
                    <td>문의 내용</td>
                <td colSpan={5}>
                <input
                    type="text"
                    style={{width: '500px', height: '100px'}}
                    readOnly
                    value={qnaDTO.qnaContents}/></td>
                </tr>

                <tr>
                <td>답변 작성</td>
                <td colSpan={3}>
                    <input
                    type="text"
                    name='ansContents'
                    style={{width: '500px', height: '100px'}}
                    onChange={handleInputChange}
                    value={answerState.ansContents || qnaAnswerDTO.ansContents}/>
                    </td>
                </tr>
                <tr>
                    <td>답변시간</td>
                    <td>{qnaAnswerDTO.ansCreate || ''}</td>
                    <td><button onClick={onClickChangeHandlerInsert}>답변 등록/수정</button></td>
                    <td><button onClick={onClickChangeHandlerDelete}>답변 삭제</button></td>
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

export default QnaDetail;