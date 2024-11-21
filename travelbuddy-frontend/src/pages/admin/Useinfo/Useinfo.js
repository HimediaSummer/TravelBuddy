import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { insertUseinfoAPI } from '../../../apis/UseinfoAPICalls';

function Useinfo () {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [useinfoDTO, setUseinfoDTO] = useState({});
    console.log('useinfoDTO 에는?',useinfoDTO);

    const cancleQnaInsert = () => {
        navigate(`/Useinfos`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setUseinfoDTO((prevState) => ({ ...prevState, [name]: value }));
};

const inserUseinfo = () => {
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
        
        const updatedUseinfoDTO = {...useinfoDTO, useinfoCreate: formattedDate};
    dispatch(insertUseinfoAPI(updatedUseinfoDTO));
    alert('사용설명서가 등록되었습니다.');
    navigate(`/Useinfos`);
};

    return (
        <div>
        <h2>공지사항</h2>
        <button onClick={cancleQnaInsert}>취소</button>
        <button onClick={inserUseinfo}>작성완료</button>
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
                            name="useinfoTitle"
                            value={useinfoDTO.useinfoTitle}
                            placeholder="제목을 입력하세요"
                            onChange={handleInputChange}
                            required
                            maxLength={100}
                        />
                    </td>
                    <td>은폐여부</td>
                    <td>
                        <select
                            name="useinfoAt"
                            value={useinfoDTO.useinfoAt}
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
                            name="useinfoContents"
                            value={useinfoDTO.useinfoContents}
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

export default Useinfo;