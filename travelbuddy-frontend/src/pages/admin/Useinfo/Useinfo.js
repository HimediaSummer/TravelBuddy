import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { insertNoticeAPI } from '../../../apis/NoticeAPICalls';

function Notice () {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [noticeDTO, setNoticeDTO] = useState({});
    console.log('noticeDTO 에는?',noticeDTO);

    const cancleQnaInsert = () => {
        navigate(`/Notices`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setNoticeDTO((prevState) => ({ ...prevState, [name]: value }));
};

const inserNotice = () => {
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
        
        const updatedQnaDTO = {...noticeDTO, noticeCreate: formattedDate};
    dispatch(insertNoticeAPI(updatedQnaDTO));
    alert('공지사항이 등록되었습니다.');
    navigate(`/Notices`);
};

    return (
        <div>
        <h2>공지사항</h2>
        <button onClick={cancleQnaInsert}>취소</button>
        <button onClick={inserNotice}>작성완료</button>
        <table>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>제목</td>
                    <td>
                        <input
                            type="text"
                            name="noticeTitle"
                            value={noticeDTO.noticeTitle}
                            placeholder="제목을 입력하세요"
                            onChange={handleInputChange}
                            required
                            maxLength={100}
                        />
                    </td>
                    <td>은폐여부</td>
                    <td>
                        <select
                            name="noticeAt"
                            value={noticeDTO.noticeAt}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">선택</option>
                            <option value={'N'}>공개</option>
                            <option value={'Y'}>비공개</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>내용</td>
                    <td>
                        <input
                            type="text"
                            name="noticeContents"
                            value={noticeDTO.noticeContents}
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

export default Notice;