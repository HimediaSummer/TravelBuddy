import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { insertQnaAPI } from "../../../apis/QnaAPICalls";


function MyQna() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qnaDTO, setQnaDTO] = useState({});

    const cancleQnaInsert = () => {
        navigate(`/MyQnas`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setQnaDTO((prevState) => ({ ...prevState, [name]: value }));
};


    const inserMyQna = () => {
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
                            <input
                                type="text"
                                name="qnaContents"
                                value={qnaDTO.qnaContents}
                                placeholder="내용을 입력하세요."
                                onChange={handleInputChange}
                                required
                                maxLength={500}
                            />
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr></tr>
                </tbody>
            </table>
        </div>
    );
}

export default MyQna;
