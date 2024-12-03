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
    const fqType = useSelector((state) => state.fqTypeReducer) || {};
    const fqTypeList = fqType.data || {};
    const {data} = qnaData;
    const {qnaDTO, qnaAnswerDTO} = data || {};
    

 
    useEffect (
        () => {
            dispatch(callQnaDetailForAdminAPI(qnaCode))
        } , [dispatch]
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;

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
        navigate(`/admin/Qnas`);
    };

    const onClickChangeHandlerDelete = () => {
        dispatch(deleteQnaAnswerAPI(qnaCode))
        alert('답변이 삭제되었습니다.');
        navigate(`/admin/Qnas`);
    };

    const onClickQnaDelete = () => {
        dispatch(deleteQnaAPI(qnaCode))
        alert('문의가 삭제되었습니다.');
        navigate(`/admin/Qnas`);
    };

    return (
        <div className="QnaDetailContainer">
        <div className="QnaDetailHeader"><p>문의Q&A</p>
            <button onClick={onClickQnaDelete}>
                                        삭제
                                    </button>
                                    </div>
        <table>
            <tbody>
                {qnaDTO ? (
                    <>
                <tr className="tr1myqnadetail">
                <td className="td1myqnadetail">제목</td>
                <td className="td2myqnadetail">{qnaDTO.qnaTitle}</td>
                <td>문의유형</td>
                <td>{Array.isArray(fqTypeList) 
    ? fqTypeList.find(f => f.fqTypeCode === qnaDTO.fqTypeCode)?.fqTypeName || "로딩중" : "로딩중"}</td>
                </tr>

                <tr>
                    <td>문의 내용</td>
                <td className="td3myqnadetail" colSpan={5}>
                <textarea
                    readOnly
                    value={qnaDTO.qnaContents}/></td>
                </tr>

                <tr>
                <td>답변 작성</td>
                <td className="td4myqnadetail" colSpan={5}>
                    <textarea
                    name='ansContents'
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