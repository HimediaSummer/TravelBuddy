import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { insertFaqAPI } from '../../../apis/FaqAPICalls';

function Faq() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [faqDTO, setFaqDTO] = useState({});
    console.log('FaqDTO 에는?',faqDTO);

    const cancleQnaInsert = () => {
        navigate(`/Faqs`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setFaqDTO((prevState) => ({ ...prevState, [name]: value }));
};


    const inserMyFaq = () => {
        dispatch(insertFaqAPI(faqDTO));
        alert('FAQ가 등록되었습니다.');
        navigate(`/Faqs`);
    };

    return (
        <div>
            <h2>FAQ</h2>
            <button onClick={cancleQnaInsert}>취소</button>
            <button onClick={inserMyFaq}>작성완료</button>
            <table>
                <thead>
                    <tr>
                        <th>FAQ 작성하기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>제목</td>
                        <td>
                            <input
                                type="text"
                                name="faqTitle"
                                value={faqDTO.faqTitle}
                                placeholder="제목을 입력하세요"
                                onChange={handleInputChange}
                                required
                                maxLength={100}
                            />
                        </td>
                        <td>유형</td>
                        <td>
                            <select
                                name="fqTypeCode"
                                value={faqDTO.fqTypeCode}
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
                        <td></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <input
                                type="text"
                                name="faqContents"
                                value={faqDTO.faqContents}
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

export default Faq;