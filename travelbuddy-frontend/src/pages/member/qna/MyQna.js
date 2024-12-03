import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from '../../../utils/tokenUtils';
import { insertQnaAPI } from "../../../apis/QnaAPICalls";


function MyQna() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const [qnaDTO, setQnaDTO] = useState({});

    const cancleQnaInsert = () => {
        navigate(`/cs/MyQnas`);
    };

    useEffect(() => {
        // 로그인 상태 확인
        const token = window.localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
            return;
        }
    }, []);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQnaDTO((prevState) => ({ ...prevState, [name]: value }));
};


    const inserMyQna = () => {
        if (qnaDTO.qnaTitle == null) {
            alert('제목을 입력해주세요');
            return;
        } else if (qnaDTO.qnaContents == null) {
            alert('문의 내용을 입력해주세요');
            return;
        } else if (qnaDTO.fqTypeCode == null) {
            alert('문의 유형을 선택해주세요');
            return;
        }
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
            
            const updatedQnaDTO = {...qnaDTO, qnaCreate: formattedDate};
            dispatch(insertQnaAPI(updatedQnaDTO));
            alert('문의가 등록되었습니다.');
            navigate(`/cs/MyQnas`);
    };

    return (
        <div className="MyQnaCreateContainer">
            <div className="MyQnaCreateHeader">
            <p>문의하기</p>
            <button onClick={cancleQnaInsert}>취소</button>
            <button onClick={inserMyQna}>작성완료</button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>제목</td>
                        <td className="td4myqnacreate">
                            <input
                                type="text"
                                name="qnaTitle"
                                value={qnaDTO.qnaTitle}
                                placeholder="제목을 입력하세요"
                                onChange={handleInputChange}
                                required
                                maxLength={100}
                                pattern=""
                            />
                        </td>
                        <td>문의유형</td>
                        <td className="td5myqnacreate">
                            <select
                                name="fqTypeCode"
                                value={qnaDTO.fqTypeCode}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">선택</option>
                                <option value={1}>보안</option>
                                <option value={2}>일정</option>
                                <option value={3}>지역</option>
                                <option value={4}>숙소</option>
                                <option value={5}>기타</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td className="td3myqnacreate" colSpan={3}>
                            <textarea
                                name="qnaContents"
                                value={qnaDTO.qnaContents}
                                placeholder="내용을 입력하세요."
                                onChange={handleInputChange}
                                required
                                maxLength={500}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MyQna;
